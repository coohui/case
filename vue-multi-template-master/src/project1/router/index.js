import Vue from 'vue'
import XEUtils from 'xe-utils'
import Router from 'vue-router'

import Home from '../views/home/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = XEUtils.getMetaTitle(to)
  next()
})

export default router
