const routes = [
  {
    path: '/personalInfo',
    name: '个人基础信息',
    meta: {
      auth: 2
    },
    component: () =>
      import(
        /* webpackChunkName: "PersonalInfo" */ '@/modules/person-management/views/basicInfo.vue'
      )
  },
  {
    path: '/edu_experience',
    name: '教育经历',
    meta: {
      auth: 2
    },
    component: () =>
      import(
        /* webpackChunkName: "edu_experience" */ '@/modules/person-management/views/edu_experience.vue'
      )
  },
  {
    path: '/blogs',
    name: '个人博客',
    meta: {
      auth: 2
    },
    component: () =>
      import(
        /* webpackChunkName: "edu_experience" */ '@/modules/person-management/views/blog.vue'
      )
  },
  {
    path: '/messages',
    name: '信息管理',
    meta: {
      auth: 2
    },
    component: () =>
      import(
        /* webpackChunkName: "Messages" */ '@/modules/person-management/views/messages.vue'
      )
  }
];

export default routes;
