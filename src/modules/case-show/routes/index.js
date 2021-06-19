import modulesRoutes from '@/modules/case-show/util/getModulesRoutes';

let routes = [
  {
    path: '/case-show',
    name: 'case-show',
    meta: {
      auth: 3
    },
    component: () =>
      import(
        /* webpackChunkName: "case-show" */ '@/modules/case-show/views/index.vue'
      )
  },
  ...modulesRoutes
];

export default routes;
