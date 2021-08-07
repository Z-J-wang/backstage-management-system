import instance from './config';
import Cookie from '../util/cookie';
import util from '@/util/index';
import store from '@/store/index';
import { Message } from 'element-ui';

const moudulesApi = util.automatedImportForArray(require.context('@/modules', true, /axios\/.+\.js/));

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
  async login(params) {
    const { data: res } = await this.axios.post('/api/account/login', params);
    if (res.code === 1000) {
      store.commit('setUserinfo', res.data);
    } else {
      Message({
        message: res.msg,
        type: 'error'
      });
    }

    return res;
  }

  /**
   * 登出
   */
  logout() {
    return this.axios.get('/api/account/logout');
  }

  /**
   * 根据token获取用户信息
   * @returns
   */
  async getUserinfo() {
    let token = this.cookie.getToken();
    if (!token) {
      return false;
    }
    const { data: res } = await this.axios.get('/api/account/getUserinfo');
    if (res.code === 1000) {
      store.commit('setUserinfo', res.data);
    } else {
      Message({
        message: res.msg,
        type: 'error'
      });
    }
  }
  /**
   * 分页查询博客列表
   * @param {*} params
   * @returns
   */
  getArticlesByPage = params => this.axios.get('/api/article/getArticlesByPage', { params: params });

  // 更新文章
  updateArticle = data => this.axios.post('/api/article/updateArticle', data);

  /**
   * 获取 tag 列表
   * @returns
   */
  getTags = () => this.axios.get('/api/tags/getTags');

  /**
   * 获取分类列表
   * @returns
   */
  getCategories = () => this.axios.get('/api/category/getCategories');

  /**
   * 上传图片通用api
   * @returns
   */
  uploadImage = data => this.axios.post('/api/uploadImage', data);

  // 获取简历基础信息
  getResume = () => this.axios.get('/api/person/getResume');

  /**
   * 获取教育经历
   * @param {*} params
   */
  getExperiences(params) {
    return this.axios.get('/api/person/getExperiences', { params: params });
  }

  // 获取工作经历
  getJobs = () => this.axios.get('/api/jobs/getJobs');

  // 获取全部项目经历
  getProjects = () => this.axios.get('/api/projects/getDatas');
}
