import AxiosConfig from '@/axios/config';

class Api extends AxiosConfig {
	constructor() {
		super();
		this.axios = super.getInstance();
	}

	/**
	 * 创建文章
	 * @param {*} params
	 * @returns
	 */
	createArticle = (params) =>
		this.axios.post('/api/article/createArticle', params);
}

export default Api;
