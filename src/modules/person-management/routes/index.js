const routes = [
  {
    path: '/personalInfo',
    name: '个人基础信息',
    meta: {
      auth: 2
    },
    component: () => import(/* webpackChunkName: "PersonalInfo" */ '@/modules/person-management/views/basicInfo.vue')
  },
  {
    path: '/edu_experience',
    name: '教育经历',
    meta: {
      auth: 2
    },
    component: () => import(/* webpackChunkName: "edu_experience" */ '@/modules/person-management/views/edu_experience.vue')
  },
  {
    path: '/job_experience',
    name: '工作经历',
    meta: {
      auth: 2
    },
    component: () => import(/* webpackChunkName: "edu_experience" */ '@/modules/person-management/views/job_experience.vue')
  },
  {
    path: '/projects',
    name: '项目经历',
    meta: {
      auth: 2
    },
    component: () => import(/* webpackChunkName: "edu_experience" */ '@/modules/person-management/views/projects.vue')
  },
  {
    path: '/blogs',
    name: '个人博客',
    meta: {
      auth: 2
    },
    component: () => import(/* webpackChunkName: "edu_experience" */ '@/modules/person-management/views/blog.vue')
  },
  {
    path: '/messages',
    name: '信息管理',
    meta: {
      auth: 2
    },
    component: () => import(/* webpackChunkName: "Messages" */ '@/modules/person-management/views/messages.vue')
  },
  {
    path: '/skills',
    name: '个人技能',
    meta: {
      auth: 2
    },
    component: () => import(/* webpackChunkName: "Messages" */ '@/modules/person-management/views/skills.vue')
  }
];

export default routes;
