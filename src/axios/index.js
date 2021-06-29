import instance from './config';
import Cookie from '../util/cookie';
import util from '@/util/index';

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
}
