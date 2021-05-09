import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import util from '@/util/index';
import Cookies from './util/cookie';
import Axios from './axios/index.js';
import custom_validator from '@a/js/custom-validator.js';

import '@a/css/common.less';
import footBar from '@/components/backstage/FooterBar.vue';


Vue.config.productionTip = false;
Vue.prototype.$Cookie = new Cookies();
Vue.prototype.$HttpApi = new Axios();
Vue.prototype.$CustomValidator = custom_validator;
Vue.prototype.$Util = util;

// 全局注册 element-ui
Vue.use(ElementUI);
Vue.component('footBar', footBar);

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
