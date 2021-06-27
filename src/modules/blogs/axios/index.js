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
   * 分页查询博客列表
   * @param {*} params 
   * @returns 
   */
  getArticlesByPage = params => this.axios.get('/api/article/getArticlesByPage', { params: params });
}

export default Api;
