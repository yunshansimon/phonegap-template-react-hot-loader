/**
 * Created by caoyang on 16/3/31.
 */
import {iwx_local_data} from './const.js'
import {get_object,save_object} from './functions.js'

let cordovaEnable= ()=> typeof window.cordova === 'object';
let pluginEnable=()=> cordovaEnable() && (typeof window.plugins ==='object');
let fileUploadEnable = ()=> typeof window.FileTransfer ==='function' && typeof window.FileUploadOptions === 'function';

export function uploadJPG(imageURI,targetURI,onSuccess,onError,params){
    let filename=imageURI.substr(imageURI.lastIndexOf('/')+1).split('?')[0];
    if(!fileUploadEnable()){
        onError('cordova-file-transfer is disable.');
        return;
    }
    var win = function (r) {
        let jsonData=JSON.parse(r.response);
        if(jsonData.code==100){
            onSuccess(jsonData.result);
        }else{
            onError(jsonData.result);
        }
    };

    var fail = function (error) {
        onError('网络错误:'+error.code);
    };

    var options = new FileUploadOptions();
    options.fileKey = "filename";
    options.fileName = filename;
    options.mimeType = "image/jpeg";

    // We append a clone since the original input will be destroyed

    options.params = params;

    var ft = new FileTransfer();
    let loginInfo = get_object(iwx_local_data.account.login_info);
    targetURI=`${targetURI}?authid=${loginInfo.authid}&token=${loginInfo.token}`;
    ft.upload(imageURI, encodeURI(targetURI), win, fail, options);
}
