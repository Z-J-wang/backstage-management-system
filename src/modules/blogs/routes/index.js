const routes = [
  {
    path: '/blog-list',
    name: 'blog-list',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "blog-list" */ '@/modules/blogs/views/index.vue')
  },
  {
    path: '/blog-detail/:id',
    name: 'blog-detail',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "blog-detail" */ '@/modules/blogs/views/detail.vue')
  }
];

export default routes;
