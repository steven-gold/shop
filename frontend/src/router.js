import { createRouter, createWebHistory } from 'vue-router'
import { state } from './api'

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/about', component: () => import('./views/About.vue') },
  { path: '/products/:category?', component: () => import('./views/Products.vue') },
  { path: '/product/:id', component: () => import('./views/ProductDetail.vue') },
  { path: '/blog/:category?', component: () => import('./views/Blog.vue') },
  { path: '/article/:id', component: () => import('./views/Article.vue') },
  { path: '/stores', component: () => import('./views/Stores.vue') },
  { path: '/contact', component: () => import('./views/Contact.vue') },
  { path: '/faq', component: () => import('./views/Faq.vue') },
  { path: '/privacy', component: () => import('./views/Legal.vue') },
  { path: '/terms', component: () => import('./views/Legal.vue') },
  { path: '/subscribe', component: () => import('./views/Subscribe.vue') },
  { path: '/search', component: () => import('./views/Search.vue') },
  { path: '/cart', component: () => import('./views/Cart.vue'), meta: { auth: true } },
  { path: '/checkout', component: () => import('./views/Checkout.vue'), meta: { auth: true } },
  { path: '/member', component: () => import('./views/Member.vue'), meta: { auth: true } },
  { path: '/admin/login', redirect: '/admin' },
  { path: '/admin', component: () => import('./admin/AdminLayout.vue'), children: [
    { path: '', component: () => import('./admin/Dashboard.vue') },
    { path: 'products', component: () => import('./admin/AdminProducts.vue') },
    { path: 'categories', component: () => import('./admin/AdminCategories.vue') },
    { path: 'menus', component: () => import('./admin/AdminMenus.vue') },
    { path: 'pages', component: () => import('./admin/AdminPages.vue') },
    { path: 'orders', component: () => import('./admin/AdminOrders.vue') },
    { path: 'news', component: () => import('./admin/AdminNews.vue') },
    { path: 'banners', component: () => import('./admin/AdminBanners.vue') },
    { path: 'stores', component: () => import('./admin/AdminStores.vue') },
    { path: 'messages', component: () => import('./admin/AdminMessages.vue') },
    { path: 'members', component: () => import('./admin/AdminMembers.vue') },
    { path: 'settings', component: () => import('./admin/AdminSettings.vue') }
  ]}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.meta.auth && !state.token) {
    state.authMode = 'login'
    state.authOpen = true
    return '/'
  }
  return true
})

export default router
