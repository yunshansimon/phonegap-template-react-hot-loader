/**
 * Created by caoyang on 16/3/16.
 */
export const isLogin = (state) => state.AuthInfo.isLogin;
export const clubInfo= (state) => state.AuthInfo.clubInfo[0];
export const loginInfo = (state)=> state.AuthInfo.loginInfo;
export const userInfo = (state)=>state.AuthInfo.userInfo;
export const locationInfo = (state)=>state.LocationInfo.locationInfo;