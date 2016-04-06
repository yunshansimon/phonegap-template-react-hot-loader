/**
 * Created by caoyang on 16/3/31.
 */
import {Promise} from 'es6-promise'
import {iwxiao_url} from './const'
import {uploadJPG} from './upload-file'

let cordovaEnable= ()=> typeof window.cordova === 'object';
let pluginEnable=()=> cordovaEnable() && (typeof window.plugins ==='object');
let cropEnable=()=> pluginEnable() && (typeof window.plugins.crop === 'function');
let cameraEnable=()=> typeof navigator.camera === "object";

export const AVATAR_SOURCE={
    fromLib:0,
    fromCamera:1
};

export function get_avatar(source=0){
    return new Promise((resolve,reject)=>{
        "use strict";
        if(cameraEnable() && cropEnable()){
            let onCameraSuccess=(imageURI)=>{
                window.plugins.crop((newPath)=>{
                    uploadJPG(newPath,iwxiao_url.account.file_upload,(uploadPath)=>{resolve(uploadPath)},(msg)=>{reject(msg)})
                },(err)=>{reject(err)},imageURI,{quality:80});
            };
            navigator.camera.getPicture(onCameraSuccess, (msg)=>{reject(msg)}, { quality: 60,
                destinationType: window.Camera.DestinationType.FILE_URI,
                allowEdit:false,
                cameraDirection: window.Camera.Direction.FRONT,
                sourceType:source
            });
        }else{
            reject('Camera or Crop plugin is disable.')
        }
    })

}
