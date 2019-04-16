import axios from 'axios'
import qs from 'qs'
import local from '@/utils/local'
axios.defaults.baseURL = 'http://127.0.0.1:518'

axios.interceptors.request.use(config=>{
    const token = local.get('lululu');

    
    config.headers.authorization = `Bearer ${token}`;
    return config;
})

export default {

    get(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{
                params
            }).then( response=>{
                resolve(response.data)
                }
            )
            .catch(err=>{
                reject(err)
            })
        })
    },
    post(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(params))
                .then(response=>{
                    resolve(response.data)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    }
    
}