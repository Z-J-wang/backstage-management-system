import instance from './config'

export default class HttpApi {
    constructor(){}

    async getBasicinfo(params){
        let res = await instance.get('/person/getBasicinfo', {params: params})
        let basicinfo = res.data.data;

        return basicinfo;
    }
}