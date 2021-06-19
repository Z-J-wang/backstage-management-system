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
	 * 获取个人基础信息
	 * @param {object} params
	 */
	getBasicinfo(params) {
		return this.axios.get('/api/person/getBasicinfo', { params: params });
	}

	/**
	 * 更新个人基础信息
	 * @param {*} params
	 */
	updateBasicinfo(params) {
		return this.axios.post('/api/person/update', params);
	}

	/**
	 * 获取教育经历
	 * @param {*} params
	 */
	getExperiences(params) {
		return this.axios.get('/api/person/getExperiences', { params: params });
	}

	/**
	 * 新增一笔教育经历
	 * @param {*} params
	 */
	createExperience(params) {
		return this.axios.post('/api/person/createExperience', params);
	}

	/**
	 * 修改一笔教育经历
	 * @param {*} params
	 */
	updateExperience(params) {
		return this.axios.post('/api/person/updateExperience', params);
	}

	/**
	 * 删除一笔教育经历
	 * @param {*} params
	 */
	deleteExperience(params) {
		return this.axios.post('/api/person/deleteExperience', params);
	}

	/**
	 * 获取博客
	 * @param {*} params
	 */
	getBlogs(params) {
		return this.axios.get('/api/person/getBlogs', { params: params });
	}

	/**
	 * 新增博客记录
	 * @param {*} params
	 */
	createBlog(params) {
		return this.axios.post('/api/person/createBlog', params);
	}

	/**
	 * 修改博客记录
	 * @param {*} params
	 */
	updateBlog(params) {
		return this.axios.post('/api/person/updateBlog', params);
	}

	/**
	 * 删除博客记录
	 * @param {*} params
	 */
	deleteBlog(params) {
		return this.axios.post('/api/person/deleteBlog', params);
	}

	/**
	 * 获取信息列表
	 * @param {*} params
	 */
	getMsgs(params) {
		return this.axios.get('/api/person/getMsgs', { params: params });
	}

	/**
	 * 新增信息
	 * @param {*} params
	 */
	createMsg(params) {
		return this.axios.post('/api/person/createMsg', params);
	}

	/**
	 * 删除信息记录
	 * @param {*} params
	 */
	deleteMsg(params) {
		return this.axios.post('/api/person/deleteMsg', params);
	}

	/**
	 * 条件查询产品列表
	 * @param {object} params
	 */
	getBMYXProductList(params) {
		return this.axios.get('/api/bmyx/getData', { params: params });
	}

	/**
	 * 根据 name 或者 sort 模糊查询
	 * @param {*} params
	 */
	searchByNameOrSort(params) {
		return this.axios.post('/api/bmyx/searchByNameOrSort', params);
	}

	/**
	 * 新增一笔产品数据
	 * @param {object} params
	 */
	createProduct(params) {
		return this.axios.post('/api/bmyx/createProduct', params);
	}

	/**
	 * 根据id修改产品数据
	 * @param {object} params
	 */
	updatedProduct(params) {
		return this.axios.post('/api/bmyx/updateProduct', params);
	}

	/**
	 * 商品上下架
	 * @param {object} params
	 */
	changeProductBan(params) {
		return this.axios.post('/api/bmyx/changeProductBan', params);
	}

	/**
	 * 根据id 删除产品数据
	 * @param {*} params
	 */
	delProduct(params) {
		return this.axios.post('/api/bmyx/delProduct', params);
	}

	/**
	 * 获取 sort
	 * @param {object} params
	 */
	getBMYXSort(params) {
		return this.axios.get('/api/bmyx/getSort', { params: params });
	}

	/**
	 * 更新 sort
	 * @param {object} params
	 */
	updatedSort(params) {
		return this.axios.post('/api/bmyx/updateSort', params);
	}

	/**
	 * 新增一笔 sort
	 * @param {object} params
	 */
	createSort(params) {
		return this.axios.post('/api/bmyx/createSort', params);
	}

	/**
	 * 根据id 删除 sort
	 * @param {object} params
	 */
	delSort(params) {
		return this.axios.post('/api/bmyx/delSort', params);
	}

	/**
	 * 删除指定图片
	 * @param {object} params
	 */
	delUploadImage(params) {
		return this.axios.post('/api/bmyx/delUploadImage', { filename: params });
	}

	/**
	 * 获取 notice
	 */
	getBMYXNotice() {
		return this.axios.get('/api/bmyx/getNotice');
	}

	/**
	 * 更新 notice
	 * @param {object} params
	 */
	updatedNotice(params) {
		return this.axios.post('/api/bmyx/updateNotice', params);
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
