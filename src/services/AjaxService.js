/**
 * Created by caoyang on 16/3/16.
 */
import { Promise } from 'es6-promise'
import {iwxiao_url,iwxiao_pub_key,iwx_local_data} from '../common/lib/const'
import {postJSON,getJSON,get_object} from '../common/lib/functions'

export const authAjax = function (url){
    var login_info=get_object(iwx_local_data.account.login_info);
    return {
        get(data={}){
            return new Promise((resolve,reject)=>{
                data.authid=login_info.authid;
                getJSON(url,data,(data)=>{
                    resolve(data.result);
                },(data)=>{
                    reject(data);
                });
            });
        },
        post(data={}){
            return new Promise((resolve,reject)=>{
                data.authid=login_info.authid;
                postJSON(url,data,(jsonData)=>{
                    resolve(jsonData.result);
                },(jsonData)=>{
                    reject(jsonData);
                });
            });
        }
    }
};

export function Ajax(url){
    return {
        get(data={}){
            return new Promise((resolve,reject)=>{
                getJSON(url,data,(data)=>{
                    resolve(data.result);
                },(data)=>{
                    reject(data);
                });
            });
        },
        post(data={}){
            return new Promise((resolve,reject)=>{
                postJSON(url,data,(jsonData)=>{
                    resolve(jsonData.result);
                },(jsonData)=>{
                    reject(jsonData);
                });
            });
        }
    }
}