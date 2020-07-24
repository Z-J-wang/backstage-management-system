import instance from './config'

export default class HttpApi {
    constructor(){}

    /**
     * 获取个人基础信息
     * @param {object} params 
     */
    getBasicinfo(params){
        return instance.get('/api/person/getBasicinfo', {params: params})
    }

    /**
     * 更新个人基础信息
     * @param {*} params 
     */
    updateBasicinfo(params){
        return instance.post('/api/person/update', params)
    }

    /**
     * 条件查询产品列表
     * @param {object} params 
     */
    getBMYXProductList(params){
        return instance.get('/api/bmyx/getData', {params: params})
    }

    /**
     * 新增一笔产品数据
     * @param {object} params 
     */
    createProduct(params){
        return instance.post('/api/bmyx/createProduct', params)
    }

    updatedProduct(params){
        return instance.post('/api/bmyx/updateProduct', params)
    }


    delProduct(params) {
        return instance.post('/api/bmyx/delProduct', params)
    }
}