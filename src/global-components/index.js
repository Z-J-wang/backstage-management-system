// 全局注册组件
export default (Vue) => {
	Vue.component('back-template', () =>
		import(
			/* webpackChunkName: "back-template" */ '@/components/template/back-template.vue'
		)
	);
	Vue.component('footBar', () => {
		import(
			/* webpackChunkName: "FooterBar" */ '@/components/backstage/FooterBar.vue'
		);
	});
	Vue.component('template-code', () => {
		import(
			/* webpackChunkName: "template-code" */ '@/components/common/template-code.vue'
		);
	});
};
