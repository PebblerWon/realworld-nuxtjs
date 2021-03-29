import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _53a0be69 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _0abc7bde = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _4d0b484a = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _10812e4a = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _cd5c9a1e = () => interopDefault(import('../pages/setting' /* webpackChunkName: "" */))
const _47d1e4ac = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _11691cd2 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _53a0be69,
    children: [{
      path: "",
      component: _0abc7bde,
      name: "home"
    }, {
      path: "/login",
      component: _4d0b484a,
      name: "login"
    }, {
      path: "/register",
      component: _4d0b484a,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _10812e4a,
      name: "profile"
    }, {
      path: "/setting",
      component: _cd5c9a1e,
      name: "setting"
    }, {
      path: "/editor/:slug?",
      component: _47d1e4ac,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _11691cd2,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
