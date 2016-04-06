/**
 * Created by caoyang on 16/3/14.
 */
import {REFRESH_TOKEN,LOGIN,LOGOUT,REFRESH_CLUB,REFRESH_USER} from '../mutation-types'
import {save_object,get_object,isEmpty} from '../../common/lib/functions'
import {iwx_local_data} from '../../common/lib/const'

var login_info=get_object(iwx_local_data.account.login_info,false);
var club_info=get_object(iwx_local_data.account.club_info,false);
var user_info=get_object(iwx_local_data.account.user_info,false);

const state={
    isLogin:!isEmpty(login_info),
    loginInfo:login_info,
    clubInfo:club_info,
    userInfo:user_info
};
const mutations={
    [REFRESH_TOKEN](state,authid){
        state.authid=authid
    },
    [LOGIN](state,loginInfo){
        state.loginInfo=loginInfo;
        state.isLogin=true;
        save_object(iwx_local_data.account.login_info,loginInfo);
    },
    [LOGOUT](state){
        state.loginInfo=false;
        state.clubInfo=false;
        state.isLogin=false;
        save_object(iwx_local_data.account.login_info,{});
    },
    [REFRESH_CLUB](state,clubInfo){
        state.clubInfo=clubInfo;
        save_object(iwx_local_data.account.club_info,clubInfo);
    },
    [REFRESH_USER](state,userInfo){
        state.userInfo=userInfo;
        save_object(iwx_local_data.account.user_info,userInfo);
    }
        
};

export default {
    state,
    mutations
}