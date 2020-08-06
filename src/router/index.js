import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/index'
import Home from '../views/Home.vue'
import Cookie from '../util/cookie'

const cookie = new Cookie();

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        redirect: 'messages',
        children: [{
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
        {
            path: '/accountManagement',
            name: '账户管理',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "accountManagement" */ '../components/AccountManagement/index.vue')
        },
        {
            path: '/BMYX',
            name: 'BMYX',
            redirect: '/BMYX/product',
            component: { render: (e) => e("router-view") },
            children: [{
                path: 'product',
                name: '产品列表',
                component: () => import( /* webpackChunkName: "BMYX_Product" */ '../components/BMYX/Product/index.vue')
            },
            {
                path: 'sort',
                name: '分类列表',
                component: () => import( /* webpackChunkName: "BMYX_Sort" */ '../components/BMYX/Sort/index.vue')
            },
            {
                path: 'notice',
                name: '通告栏',
                component: () => import( /* webpackChunkName: "BMYX_Notice" */ '../components/BMYX/Notice/index.vue')
            }]
        }]
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

router.beforeEach((to, from, next) => {
    let token = cookie.hasToken();
    if (token) {
        next();
    } else {
        if (to.name !== "Login") {
            next({ name: 'Login' })
        } else {
            next()
        }
    }
})

export default router