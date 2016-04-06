/**
 * Created by caoyang on 16/3/15.
 */
import * as types from './mutation-types'
import {postJSON,getJSON,get_object} from '../common/lib/functions'
import {RSA} from '../common/lib/jsbn';
import { Promise } from 'es6-promise'
import {iwxiao_url,iwxiao_pub_key,iwx_local_data} from '../common/lib/const'
import {authAjax,Ajax} from '../services/AjaxService'
import {getCity,getNearbyShop} from '../services/LocationService'

export const Login = ({dispatch},{user,pw}) => {
    var jsonStr=JSON.stringify({user:user,pw:pw});
    var rsa_key=RSA.getPublicKey(iwxiao_pub_key);
    var token=RSA.encrypt(jsonStr,rsa_key);
    //console.log(this.token);
    return new Promise((resolve,reject)=> {
        postJSON(iwxiao_url.account.get_login, {token: token}, (jsonObj)=> {
            var login_info = jsonObj.result;
            login_info.token = token;
            dispatch(types.LOGIN, login_info);
            resolve(login_info);
        }, (jsonObj)=> {
            reject(jsonObj.result)
        })
    });
};

export const Register = ({dispatch},{login_mobile,password,verify_code,school_id})=>{
    var jsonStr = JSON.stringify({
        login_mobile:login_mobile,
        password:password,
        verify_code:verify_code,
        school_id:school_id
    });
    var rsa_key=RSA.getPublicKey(iwxiao_pub_key);
    var token=RSA.encrypt(jsonStr,rsa_key);
    return new Promise(
        (resolve,reject)=>{
            postJSON(iwxiao_url.account.post_register,{token:token},(jsonObj)=>{
                var reg_info = jsonObj.result;
                //dispatch(types.REGISTER,reg_info);
                resolve(reg_info);
            },(jsonObj)=>{
                reject(jsonObj.result);
            })
        }
    );
}

export const Reassign = ({dispatch},{login_mobile,password,verify_code})=>{
    var jsonStr = JSON.stringify({
        login_mobile:login_mobile,
        password:password,
        verify_code:verify_code
    });
    var rsa_key=RSA.getPublicKey(iwxiao_pub_key);
    var token=RSA.encrypt(jsonStr,rsa_key);
    return new Promise(
        (resolve,reject)=>{
            postJSON(iwxiao_url.account.post_forget,{token:token},(jsonObj)=>{
                var reassign_info = jsonObj.result;
                resolve(reassign_info);
            },(jsonObj)=>{
                reject(jsonObj.result);
            })
        }
    );
};

export const ResetPassWord = ({dispath},{authid,oldpw,newpw})=>{
    var jsonStr = JSON.stringify({
        authid:authid,
        oldpw:oldpw,
        newpw:newpw
    });
    var rsa_key=RSA.getPublicKey(iwxiao_pub_key);
    var token=RSA.encrypt(jsonStr,rsa_key);
    return new Promise(
        (resolve,reject)=>{
            postJSON(iwxiao_url.account.post_edit_pw,{token:token},(jsonObj)=>{
                resolve(jsonObj.result);
            },(jsonObj)=>{
                reject(jsonObj.result);
            })
        }
    );
};

export const Logout = ({dispatch})=>{
    dispatch(types.LOGOUT)
};

export const RefreshClub = ({dispatch}) =>{
    var ajaxObj= authAjax(iwxiao_url.home.get_club_info);
    return new Promise((resolve,reject)=>{
        ajaxObj.get({}).then((clubInfo)=>{
            dispatch(types.REFRESH_CLUB,clubInfo);
            resolve(clubInfo);
        },(data)=>{
            reject(data);
        });
    });
};

export const RefreshUser = ({dispatch}) =>{
    var ajaxObj= authAjax(iwxiao_url.account.get_user_info);
    return new Promise((resolve,reject)=>{
        ajaxObj.get({}).then((userInfo)=>{
            dispatch(types.REFRESH_USER,userInfo);
            resolve(userInfo);
        },(data)=>{
            reject(data);
        });
    });
};

export const SaveLocation = ({dispatch},location_info)=>{
    dispatch(types.REFRESH_LOCATION,location_info);
};

export const GetLocation = ({dispatch})=>{
    var current_city_name = '北京';
    return new Promise((resolve,reject)=> {
        getCity().then(
            (return_city_name)=> {
                current_city_name = return_city_name.substr(0, 2);
                Ajax(iwxiao_url.coupon.get_all_city_list).get().then(
                    (all_city_list)=> {
                        for (let v of all_city_list) {
                            let patt = new RegExp(current_city_name);
                            if (patt.test(v.location_name)) {
                                dispatch(types.REFRESH_LOCATION, v);
                                resolve(v);
                            }
                        }
                        if (self.NoRegexpResult) {
                            let location_info = {
                                "location_id": "1",
                                "father_location_id": "0",
                                "location_name": "北京",
                                "hot_level": "1"
                            };
                            dispatch(types.REFRESH_LOCATION, location_info);
                            resolve(location_info);
                        }
                    },
                    (failData)=> {
                        reject(failData);
                    });
            },
            (failData)=> {
                reject(failData);
            })
    });
};