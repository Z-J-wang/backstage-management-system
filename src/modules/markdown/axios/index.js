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
  createArticle = params => this.axios.post('/api/article/createArticle', params);

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

export default Api;
