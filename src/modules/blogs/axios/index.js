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
   * 根据 id 获取文章
   * @param {*} id
   * @returns
   */
  getArticlesByID = id => this.axios.get('/api/article/getArticlesByID', { params: { id: id } });
}

export default Api;
