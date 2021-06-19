const routes = [
  {
    path: '/BMYX',
    name: 'BMYX',
    redirect: '/BMYX/product',
    component: { render: (e) => e('router-view') },
    children: [
      {
        path: 'product',
        name: '产品列表',
        meta: {
          auth: 1
        },
        component: () =>
          import(
            /* webpackChunkName: "BMYX_Product" */ '@/modules/bmyx-management/views/products.vue'
          )
      },
      {
        path: 'sort',
        name: '分类列表',
        meta: {
          auth: 1
        },
        component: () =>
          import(
            /* webpackChunkName: "BMYX_Sort" */ '@/modules/bmyx-management/views/sorts.vue'
          )
      },
      {
        path: 'notice',
        name: '通告栏',
        meta: {
          auth: 1
        },
        component: () =>
          import(
            /* webpackChunkName: "BMYX_Notice" */ '@/modules/bmyx-management/views/notice.vue'
          )
      }
    ]
  }
];

export default routes;
