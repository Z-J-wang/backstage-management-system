import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store/index'
import Cookie from '../util/cookie';
import Axios from '../axios/index';
import accountManagementRoutes from '@/modules/account-management/routes/index';
import personManagementRoutes from '@/modules/person-management/routes/index';
import bmyxManagementRoutes from '@/modules/bmyx-management/routes/index';
import caseShowRoutes from '@/modules/case-show/routes/index';
import markdownRoutes from '@/modules/markdown/routes/index';
import blogsRoutes from '@/modules/blogs/routes/index';

let auth = 3;
const axios = new Axios();
const cookie = new Cookie();
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/backstage',
    name: 'backstage',
    component: () => import(/* webpackChunkName: "backsstage" */ '../views/backstage.vue'),
    children: [...accountManagementRoutes, ...personManagementRoutes, ...bmyxManagementRoutes]
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
  },
  ...caseShowRoutes,
  ...markdownRoutes,
  ...blogsRoutes
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name == null) {
    next({ name: '404' });
  } else if (to.name == '404') {
    next();
  } else if (to.meta.auth == 3) {
    next();
  } else {
    const token = cookie.getToken();
    if (token) {
      axios
        .getCurrentAccount()
        .then(res => {
          auth = res.data.data.auth;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          if (to.meta.auth >= auth) {
            next();
          } else {
            next({ name: 'Login' });
          }
        });
    } else {
      if (to.name !== 'Login') {
        next({ name: 'Login' });
      } else {
        next();
      }
    }
  }
});

export default router;
