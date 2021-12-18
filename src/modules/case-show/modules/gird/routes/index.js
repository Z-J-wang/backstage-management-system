const routes = [
  {
    path: '/grid',
    name: 'grid',
    meta: {
      auth: 3,
      name: 'Grid 布局'
    },
    component: () => import(/* webpackChunkName: "case-show" */ '@/modules/case-show/modules/gird/views/index.vue')
  }
];

export default routes;
