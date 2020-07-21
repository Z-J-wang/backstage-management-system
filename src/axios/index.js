import instance from './config'

export default class HttpApi {
    constructor(){}

    getBasicinfo(params){
        return instance.get('/api/person/getBasicinfo', {params: params})
    }

    updateBasicinfo(params){
        return instance.post('/api/person/update', params)
    }
}