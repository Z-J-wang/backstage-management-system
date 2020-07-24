import instance from './config'

export default class HttpApi {
    constructor() { }

    /**
     * 获取个人基础信息
     * @param {object} params 
     */
    getBasicinfo(params) {
        return instance.get('/api/person/getBasicinfo', { params: params })
    }

    /**
     * 更新个人基础信息
     * @param {*} params 
     */
    updateBasicinfo(params) {
        return instance.post('/api/person/update', params)
    }

    /**
     * 条件查询产品列表
     * @param {object} params 
     */
    getBMYXProductList(params) {
        return instance.get('/api/bmyx/getData', { params: params })
    }

    /**
     * 新增一笔产品数据
     * @param {object} params 
     */
    createProduct(params) {
        return instance.post('/api/bmyx/createProduct', params)
    }

    /**
     * 根据id修改产品数据
     * @param {object} params 
     */
    updatedProduct(params) {
        return instance.post('/api/bmyx/updateProduct', params)
    }

    /**
     * 根据id 删除产品数据
     * @param {*} params 
     */
    delProduct(params) {
        return instance.post('/api/bmyx/delProduct', params)
    }

    /**
     * 获取 sort
     * @param {object} params 
     */
    getBMYXSort(params) {
        return instance.get('/api/bmyx/getSort', { params: params })
    }

    /**
     * 更新 sort
     * @param {object} params 
     */
    updatedSort(params) {
        return instance.post('/api/bmyx/updateSort', params)
    }

    /**
     * 新增一笔 sort
     * @param {object} params 
     */
    createSort(params) {
        return instance.post('/api/bmyx/createSort', params)
    }


    /**
     * 根据id 删除 sort
     * @param {*} params 
     */
    delSort(params) {
        return instance.post('/api/bmyx/delSort', params)
    }
}