import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _24cc6dd5 = () => interopDefault(import('../pages/About.vue' /* webpackChunkName: "pages/About" */))
const _5291825a = () => interopDefault(import('../pages/ChooseLesson/index.vue' /* webpackChunkName: "pages/ChooseLesson/index" */))
const _dbec9c44 = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _c2a62fb4 = () => interopDefault(import('../pages/video/index.vue' /* webpackChunkName: "pages/video/index" */))
const _558419b3 = () => interopDefault(import('../pages/etdetail/_id.vue' /* webpackChunkName: "pages/etdetail/_id" */))
const _140a552b = () => interopDefault(import('../pages/lesson/_id.vue' /* webpackChunkName: "pages/lesson/_id" */))
const _190cdcd7 = () => interopDefault(import('../pages/newsdetail/_id.vue' /* webpackChunkName: "pages/newsdetail/_id" */))
const _00f9abe1 = () => interopDefault(import('../pages/order/_id.vue' /* webpackChunkName: "pages/order/_id" */))
const _bdf06f16 = () => interopDefault(import('../pages/teacher/_id.vue' /* webpackChunkName: "pages/teacher/_id" */))
const _11499246 = () => interopDefault(import('../pages/teacherdetail/_id.vue' /* webpackChunkName: "pages/teacherdetail/_id" */))
const _519d9bd3 = () => interopDefault(import('../pages/usercenter/_id.vue' /* webpackChunkName: "pages/usercenter/_id" */))
const _191baf1f = () => interopDefault(import('../pages/videodetail/_id.vue' /* webpackChunkName: "pages/videodetail/_id" */))
const _65dbae8c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
    component: _24cc6dd5,
    name: "About"
  }, {
    path: "/ChooseLesson",
    component: _5291825a,
    name: "ChooseLesson"
  }, {
    path: "/news",
    component: _dbec9c44,
    name: "news"
  }, {
    path: "/video",
    component: _c2a62fb4,
    name: "video"
  }, {
    path: "/etdetail/:id?",
    component: _558419b3,
    name: "etdetail-id"
  }, {
    path: "/lesson/:id?",
    component: _140a552b,
    name: "lesson-id"
  }, {
    path: "/newsdetail/:id?",
    component: _190cdcd7,
    name: "newsdetail-id"
  }, {
    path: "/order/:id?",
    component: _00f9abe1,
    name: "order-id"
  }, {
    path: "/teacher/:id?",
    component: _bdf06f16,
    name: "teacher-id"
  }, {
    path: "/teacherdetail/:id?",
    component: _11499246,
    name: "teacherdetail-id"
  }, {
    path: "/usercenter/:id?",
    component: _519d9bd3,
    name: "usercenter-id"
  }, {
    path: "/videodetail/:id?",
    component: _191baf1f,
    name: "videodetail-id"
  }, {
    path: "/",
    component: _65dbae8c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
