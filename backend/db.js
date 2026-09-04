const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { createSeed } = require('./seed')
const { migrate } = require('./cms')

const DATA_PATH = path.join(__dirname, 'data.json')

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

function load() {
  if (!fs.existsSync(DATA_PATH)) {
    const data = migrate(createSeed(hashPassword))
    save(data)
    return data
  }
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
  if ((data.cmsVersion || 0) < 2) {
    const migrated = migrate(data)
    save(migrated)
    return migrated
  }
  return data
}

function save(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

function nextId(data) {
  data.nextId = (data.nextId || 100) + 1
  return data.nextId
}

module.exports = { load, save, nextId, hashPassword, verifyPassword, DATA_PATH }
