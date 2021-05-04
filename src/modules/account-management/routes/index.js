const routes = [
	{
		path: '/accountManagement',
		name: '账户管理',
		meta: {
			auth: 0
		},
		component: () =>
			import(
				/* webpackChunkName: "accountManagement" */ '@/modules/account-management/views/index.vue'
			)
	}
];

export default routes;
