import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Router validate before each routing
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // https://router.vuejs.org/guide/advanced/meta.html
  if (requiresAuth) {
    // Redirect unauthenticated user to login
    if (!isAuthenticated) {
      next({ name: 'login' })
    }
    next()
  } else if (!requiresAuth && isAuthenticated) {
    next({ name: 'home' })
  }
  next()
})

export default router
