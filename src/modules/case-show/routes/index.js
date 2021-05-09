import theInputPwd  from '@/modules/case-show/modules/input-password/routes/index'

const routes = [
	{
		path: '/case-show',
		name: 'case-show',
		meta: {
			auth: 3
		},
		component: () => import(/* webpackChunkName: "case-show" */ '@/modules/case-show/views/index.vue')
	},
	...theInputPwd
];

export default routes;
