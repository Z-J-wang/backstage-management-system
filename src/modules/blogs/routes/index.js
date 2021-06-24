const routes = [
  {
    path: '/blog-list',
    name: 'blog-list',
    meta: {
      auth: 3
    },
    component: () => import(/* webpackChunkName: "accountManagement" */ '@/modules/blogs/views/index.vue')
  }
];

export default routes;
