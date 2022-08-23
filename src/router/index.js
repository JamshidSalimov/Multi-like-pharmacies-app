import Vue from 'vue'
import VueRouter from 'vue-router'
// import * as Sentry from "@sentry/vue";
// import {Integrations} from "@sentry/tracing";
// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'

import product from './routes/product'
import users from './routes/users'
import orders from './routes/orders'
import company from './routes/company'

import pages from './routes/pages'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    // { path: '/', redirect: { name: 'dashboard-analytics' } },
    { path: '/', redirect: { name: 'dashboard-analytics' } },
    ...apps,
    ...dashboard,

    ...product,
    ...users,
    ...orders,
    ...company,

    ...pages,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    const role = userData.is_superuser ? 'admin' : ''
    next(getHomeRouteForLoggedInUser(userData ? role : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

// Sentry.init({
//   Vue,
//   dsn: "https://0819217c496a48fc8bdeff759b353ed3@o1058451.ingest.sentry.io/6046255",
//   integrations: [
//     new Integrations.BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       tracingOrigins: ["localhost", "http://admin.multilek.uz/", /^\//],
//     }),
//   ],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

export default router
