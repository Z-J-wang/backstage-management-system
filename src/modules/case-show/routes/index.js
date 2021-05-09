import util from '@/util/index';

let modulesRoutes = [];	// modules 中的路由
// 自动加载 /case-show/modules/ 里全部的路由文件
const arr_imports = util.automatedImport(
	require.context('@/modules/case-show/modules/', true, /\.js/)
);

// modules 路由整合
arr_imports.forEach((route) => {
	modulesRoutes = [...modulesRoutes, ...route];
});

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
