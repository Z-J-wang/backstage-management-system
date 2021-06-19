import AxiosConfig from '@/axios/config';

class Api extends AxiosConfig {
  constructor() {
    super();
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
}

export default Api;
