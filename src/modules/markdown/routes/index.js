const routes = [
	{
		path: '/markdown',
		name: 'markdown',
		meta: {
			auth: 3
		},
		component: () =>
			import(
				/* webpackChunkName: "accountManagement" */ '@/modules/markdown/views/index.vue'
			)
	}
];

export default routes;
