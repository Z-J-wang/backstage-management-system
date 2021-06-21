// 全局注册组件
export default Vue => {
  Vue.component('back-template', () => import(/* webpackChunkName: "back-template" */ '@/components/template/back-template.vue'));
  Vue.component('base-template', () => import(/* webpackChunkName: "base-template" */ '@/components/template/base-template.vue'));
  Vue.component('foot-bar', () => import(/* webpackChunkName: "FooterBar" */ '@/components/backstage/FooterBar.vue'));
  Vue.component('template-code', () => import(/* webpackChunkName: "template-code" */ '@/components/template/template-code.vue'));
};
