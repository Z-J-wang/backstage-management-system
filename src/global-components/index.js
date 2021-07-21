// 全局注册组件
export default Vue => {
  Vue.component('back-template', () => import(/* webpackChunkName: "back-template" */ '@/global-components/modules/back-template.vue'));
  Vue.component('base-template', () => import(/* webpackChunkName: "base-template" */ '@/global-components/modules/base-template.vue'));
  Vue.component('foot-bar', () => import(/* webpackChunkName: "FooterBar" */ '@/components/backstage/FooterBar.vue'));
  Vue.component('template-code', () => import(/* webpackChunkName: "template-code" */ '@/global-components/modules/template-code.vue'));
  Vue.component('the-editor', () => import(/* webpackChunkName: "the-editor" */ '@/global-components/modules/the-editor.vue'));
};
