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
   * 新建个人基础信息
   * @param {*} params
   * @returns
   */
  createBasicinfo(params) {
    return this.axios.post('/api/person/create', params);
  }

  /**
   * 更新个人基础信息
   * @param {*} params
   */
  updateBasicinfo(params) {
    return this.axios.post('/api/person/update', params);
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

  // 新增一笔工作经历记录
  createJobs = params => this.axios.post('/api/jobs/createJob', params);

  // 更新工作经历
  updateJob = params => this.axios.post('/api/jobs/updateJob', params);

  // 删除工作经历
  deleteJob = params => this.axios.post('/api/jobs/deleteJob', params);

  // 新增一笔项目经历
  createProject = params => this.axios.post('/api/projects/create', params);

  // 项目经历更新
  updateProject = params => this.axios.post('/api/projects/update', params);

  // 删除一笔项目经历
  deleteProject = params => this.axios.post('/api/projects/delete', params);

  // 新增一笔个人技能
  createSkills = params => this.axios.post('/api/skills/create', params);

  // 个人技能更新
  updateSkills = params => this.axios.post('/api/skills/update', params);

  // 删除一笔个人技能
  deleteSkills = params => this.axios.post('/api/skills/delete', params);
}

export default Api;
