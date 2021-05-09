const routes = [
	{
		path: '/the-input-password',
		name: 'the-input-password',
		meta: {
			auth: 3
		},
		component: () => import(/* webpackChunkName: "case-show" */ '@/modules/case-show/modules/input-password/views/index.vue')
	}
];

export default routes;
