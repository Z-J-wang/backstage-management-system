import AxiosConfig from '@/axios/config';

class Api extends AxiosConfig {
  constructor() {
    super();
    this.axios = super.getInstance();
  }

  /**
	 * 获取 account
	 * @param {object} params
	 */
  getAccountByCond(params) {
    return this.axios.get('/api/account/getAccountByCond', { params: params });
  }

  /**
	 * 创建账户
	 * @param {object} params
	 */
  createAccount(params) {
    return this.axios.post('/api/account/createAccount', params);
  }

  /**
	 * 创建账户
	 * @param {object} params
	 */
  updatedAccount(params) {
    return this.axios.post('/api/account/updateAccount', params);
  }

  /**
	 * 获取当前用户信息
	 */
  getCurrentAccount() {
    const account = this.cookie.getUserInfo();
    return this.axios.get('/api/account/getCurrentAccount', {
      params: { account: account }
    });
  }
}

export default Api;
