const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { createSeed } = require('./seed')
const { migrate } = require('./cms')

const DATA_PATH = path.join(__dirname, 'data.json')
const UPLOAD_DIR = path.join(__dirname, 'uploads')

function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || ''
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password, stored) {
  if (!stored || !password) return false
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const verify = crypto.scryptSync(password, salt, 64).toString('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verify, 'hex'))
  } catch {
    return false
  }
}

function seedData() {
  return migrate(createSeed(hashPassword))
}

let sqlClient = null

async function getSql() {
  const url = databaseUrl()
  if (!url) return null
  if (!sqlClient) {
    const { neon } = require('@neondatabase/serverless')
    sqlClient = neon(url)
    await sqlClient`CREATE TABLE IF NOT EXISTS shop_state (
      id integer PRIMARY KEY,
      payload jsonb NOT NULL
    )`
    await sqlClient`CREATE TABLE IF NOT EXISTS shop_files (
      name text PRIMARY KEY,
      mime text NOT NULL,
      data bytea NOT NULL
    )`
  }
  return sqlClient
}

async function load() {
  const sql = await getSql()
  if (sql) {
    const rows = await sql`SELECT payload FROM shop_state WHERE id = 1`
    if (!rows.length) {
      const data = seedData()
      await sql`INSERT INTO shop_state (id, payload) VALUES (1, ${data})`
      return data
    }
    let data = rows[0].payload
    if ((data.cmsVersion || 0) < 2) {
      data = migrate(data)
      await save(data)
    }
    return data
  }
  if (!fs.existsSync(DATA_PATH)) {
    const data = seedData()
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
    return data
  }
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
  if ((data.cmsVersion || 0) < 2) {
    const migrated = migrate(data)
    fs.writeFileSync(DATA_PATH, JSON.stringify(migrated, null, 2))
    return migrated
  }
  return data
}

async function save(data) {
  const sql = await getSql()
  if (sql) {
    await sql`INSERT INTO shop_state (id, payload) VALUES (1, ${data})
      ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload`
    return
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

async function putUpload(name, buffer, mime) {
  const sql = await getSql()
  if (sql) {
    await sql`INSERT INTO shop_files (name, mime, data)
      VALUES (${name}, ${mime || 'application/octet-stream'}, ${buffer})
      ON CONFLICT (name) DO UPDATE SET mime = EXCLUDED.mime, data = EXCLUDED.data`
    return
  }
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  fs.writeFileSync(path.join(UPLOAD_DIR, path.basename(name)), buffer)
}

async function getUpload(name) {
  const safe = path.basename(name || '')
  if (!safe) return null
  const sql = await getSql()
  if (sql) {
    const rows = await sql`SELECT mime, data FROM shop_files WHERE name = ${safe}`
    if (!rows.length) return null
    const raw = rows[0].data
    const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw)
    return { mime: rows[0].mime || 'application/octet-stream', buffer }
  }
  const fp = path.join(UPLOAD_DIR, safe)
  if (!fs.existsSync(fp)) return null
  return { mime: 'application/octet-stream', buffer: fs.readFileSync(fp) }
}

function nextId(data) {
  data.nextId = (data.nextId || 100) + 1
  return data.nextId
}

module.exports = { load, save, nextId, hashPassword, verifyPassword, DATA_PATH, getUpload, putUpload }
