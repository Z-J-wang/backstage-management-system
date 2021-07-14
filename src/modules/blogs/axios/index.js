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

  /**
   * 文章浏览量自增
   * @param {*} id
   * @returns
   */
  pageViewAutoIncre = id => this.axios.post('/api/article/pageViewAutoIncre', { id: id });

  /**
   * 文章禁用
   * @param {*} id
   * @returns
   */
  ban = id => this.axios.post('/api/article/ban', { id: id });

  /**
   * 文章解禁
   * @param {*} id
   * @returns
   */
  unban = id => this.axios.post('/api/article/unban', { id: id });
}

export default Api;
