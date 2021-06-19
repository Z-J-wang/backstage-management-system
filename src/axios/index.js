import instance from './config';
import Cookie from '../util/cookie';
import util from '@/util/index';

const moudulesApi = util.automatedImportForArray(
  require.context('@/modules', true, /axios\/.+\.js/)
);

export default class httpApi extends util.classMixin(instance, ...moudulesApi) {
  constructor() {
    super();
    this.cookie = new Cookie();
    this.axios = super.getInstance();
  }

  /**
	 * 登录
	 * @param {object} params
	 */
  login(params) {
    return this.axios.post('/api/account/login', params);
  }

  /**
	 * 登出
	 */
  logout() {
    return this.axios.get('/api/account/logout');
  }
}
