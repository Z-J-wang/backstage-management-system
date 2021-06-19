import AxiosConfig from '@/axios/config';

class Api extends AxiosConfig {
  constructor() {
    super();
    this.axios = super.getInstance();
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
}

export default Api;
