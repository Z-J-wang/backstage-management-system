import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'PersonalInfo',
    children:[
        {
          path: '/test',
          name: '测试页面',
          component: () => import(/* webpackChunkName: "test" */ '@c/Test.vue')
        },
        {
          path: '/tableView',
          name: '表格页面',
          component: () => import(/* webpackChunkName: "test" */ '../components/TableView.vue')
        },
        {
            path: '/PersonalInfo',
            name: '个人基础信息',
            component: () => import(/* webpackChunkName: "PersonalInfo" */ '../components/Person/PersonalInfo.vue')
          },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
