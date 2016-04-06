/**
 * Created by caoyang on 16/3/31.
 */
import {Promise} from 'es6-promise'

let amapEnable=()=>typeof window.AMap === 'object';
function locationEnable(){
    return typeof navigator.geolocation === 'object';
}

function getLocation(){
    return new Promise((resolve,reject)=>{
        if(locationEnable()){
            navigator.geolocation.getCurrentPosition(({coords})=>{
                resolve({lng:coords.longitude,lat:coords.latitude});
            }, ({message})=>{
                reject(message);
            })
        }else{
            reject('cordova-geolocation is disable.');
        }
    });
}

export function getCity(){
    return new Promise((resolve,reject)=>{
        if(amapEnable()) {
            let citysearch = new AMap.CitySearch();
            citysearch.getLocalCity(function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        resolve(result.city);
                    }else{
                        reject('Can not find your city by ip');
                    }
                } else {
                    reject(result.info);
                }
            });
        }else{
            reject('AMap is disable');
        }
    })
}

export function getNearbyShop(city='北京市',type='餐饮服务'){
    return new Promise((resolve,reject)=>{
        if(amapEnable()) {
            let placeSearch= new AMap.PlaceSearch({city:city,type:type});
            getLocation().then(({lng,lat})=>{
                let center= new AMap.LngLat(lng,lat);
                placeSearch.searchNearBy('',center,300,(status,result)=>{
                    if (status === 'complete' && result.info === 'OK') {
                        var shopList=[];
                        for(let shop of result.poiList.pois){
                            shopList.push(shop.name)
                        }
                        resolve(shopList);
                    } else {
                        reject(result.info);
                    }
                });
            },(msg)=>{reject(msg)})
        }else{
            reject('AMap is disable');
        }
    })
}