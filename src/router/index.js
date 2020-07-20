import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        redirect: 'messages',
        children: [
            {
                path: '/personalInfo',
                name: '个人基础信息',
                component: () => import( /* webpackChunkName: "PersonalInfo" */ '../components/Person/BasicInfo/index.vue')
            },
            {
                path: '/edu_experience',
                name: '教育经历',
                component: () => import( /* webpackChunkName: "edu_experience" */ '../components/Person/Edu_experience/index.vue')
            },
            {
                path: '/blogs',
                name: '个人博客',
                component: () => import( /* webpackChunkName: "edu_experience" */ '../components/Person/Blog/index.vue')
            },
            {
                path: '/messages',
                name: '信息管理',
                component: () => import( /* webpackChunkName: "Messages" */ '../components/Person/Messages/index.vue')
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router