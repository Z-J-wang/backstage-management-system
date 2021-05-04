import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/index'
import Home from '../views/Home.vue'
import Cookie from '../util/cookie'
import Axios from '../axios/index'

import accountManagementRoutes from '@/modules/account-management/routes/index'
import personManagementRoutes from '@/modules/person-management/routes/index'

const axios = new Axios()
const cookie = new Cookie()
let auth = 3

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: 'Home',
    children: [
    {
      path: '/BMYX',
      name: 'BMYX',
      redirect: '/BMYX/product',
      component: { render: (e) => e('router-view') },
      children: [{
        path: 'product',
        name: '产品列表',
        meta: {
          auth: 1
        },
        component: () => import(/* webpackChunkName: "BMYX_Product" */ '../components/BMYX/Product/index.vue')
      },
      {
        path: 'sort',
        name: '分类列表',
        meta: {
          auth: 1
        },
        component: () => import(/* webpackChunkName: "BMYX_Sort" */ '../components/BMYX/Sort/index.vue')
      },
      {
        path: 'notice',
        name: '通告栏',
        meta: {
          auth: 1
        },
        component: () => import(/* webpackChunkName: "BMYX_Notice" */ '../components/BMYX/Notice/index.vue')
      }]
    },
    ...accountManagementRoutes,
    ...personManagementRoutes
  ]
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      auth: 0
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == null) {
    next({ name: '404' })
  } else if (to.name == '404') {
    next()
  } else {
    const token = cookie.getToken()
    if (token) {
      axios.getCurrentAccount().then((res) => {
        auth = res.data.data.auth
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        if (to.meta.auth >= auth) {
          next()
        } else {
          next({ name: 'Login' })
        }
      })
    } else {
      if (to.name !== 'Login') {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  }
})

export default router
