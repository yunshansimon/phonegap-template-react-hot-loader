/**
 * Created by caoyang on 11/18/15.
 */
/**
 * 切换元素类名
 * @param el
 * @param class_name
 */
import {iwxiao_url,iwx_local_data,iwxiao_debug} from './const'

export function toggle_class (el, class_name) {
  el.classList.toggle(class_name)
}

function showError (msg) {
  alert(msg)
}

export function showInfo (msg) {
  alert(msg)
}

export function parseElFromString (str) {
  var objE = document.createElement('div')
  objE.innerHTML = str
  return objE.firstElementChild
}

export function load_img_url (img, url, val) {
  var reg_out = /^http/
  url = arguments[1] || img.getAttribute('img-src')
  if (isEmpty(url)) return false
  url = url.split(',')[0]
  if (typeof (val)=='undefined') {
      val = img.getAttribute('data-val') || ''
    }
  if (reg_out.test(url)) {
      img.src = url
        /*
        if(val!==""){
            resize_img(img,val);
        }*/
    } else {
      if (dbCache) {
          showCacheImg(img, url, val)
        } else {
          getJSON(iwxiao_url.file.get_img, {filename:url, val:val}, function (data) {
              if (data.code == 100) {
                  img.src = data.result
                } else {
                  showError(data.result)
                }
            })
        }
    }
}

export function return_real_img_url(url) {
    var real_img_url = ''
    getJSON(iwxiao_url.file.get_img, {filename:url, val:''}, function (data) {
        if (data.code == 100) {
            real_img_url = data.result
        }else{
            console.log(data.result)
        }
    })
    return real_img_url
}

function resize_img (img, val) {
  var reg_w = /\d+(?=w)/
  var reg_h = /\d+(?=h)/
  var el_height = val.match(reg_h)
  if (el_height) {
      img.style.height = el_height[0] + 'px'
    } else {
      img.style.height = 'auto'
    }
  var el_width = val.match(reg_w)
  if (el_width) {
      img.style.width = el_width[0] + 'px'
    } else {
      img.style.width = 'auto'
    }
}

/** 以下是url缓存函数,内部使用   **/
var dbCache = false
function initDatabase () {
  var db = getCurrentDb()// 初始化数据库
  if (!db) { dbCache = false; return; } else {
      dbCache = true
    }
  db.transaction(function (trans) { // 启动一个事务，并设置回调函数
        // 执行创建表的Sql脚本
      trans.executeSql('create table if not exists urlCache(urlIn text PRIMARY KEY NOT NULL ,urlOut text NOT NULL, timeStamp integer Not NULL )', [], function (trans, result) {
        }, function (trans, message) { // 消息的回调函数alert(message);});
        }, function (trans, result) {
        }, function (trans, message) {
        })
    })
}

function getCurrentDb () {
    // 打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    // 如果数据库不存在那么创建之
  var db = openDatabase('iwxDb', '1.0', 'iwx_web app dataCache 1.0', 1024 * 1024) ;
  return db
}
// 显示所有数据库中的数据到页面上去
function showCacheImg (img, url, val) {
  var urlIn = url + val
  var db = getCurrentDb()
  var timestamp = parseInt((new Date()).valueOf() / 1000)
  db.transaction(function (trans) {
      trans.executeSql('select urlOut,timeStamp from urlCache where urlIn=?', [urlIn], function (ts, data) {
          if (data.rows.length > 0 && (timestamp - data.rows.item(0)['timeStamp']) < 500000) {
              img.src = data.rows.item(0)['urlOut']
                /*
                if(val!==""){
                    resize_img(img,val);
                }*/
            } else if (data.rows.length > 0) {
              getJSON(iwxiao_url.file.get_img, {filename:url, val:val}, function (data) {
                  if (data.code == 100) {
                      img.src = data.result
                        /*
                        if(val!==""){
                            resize_img(img,val);
                        }*/
                      updateToTable(urlIn, data.result, timestamp)
                    } else {
                      showError(data.result)
                    }
                })
            } else {
              getJSON(iwxiao_url.file.get_img, {filename:url, val:val}, function (data) {
                  if (data.code == 100) {
                      img.src = data.result
                        /*
                        if(val!==""){
                            resize_img(img,val);
                        }*/
                      writeToTable(urlIn, data.result, timestamp)
                    } else {
                      showError(data.result)
                    }
                })
            }
        }, function (ts, message) {
          getJSON(iwxiao_url.file.get_img, {filename:url, val:val}, function (data) {
              if (data.code == 100) {
                  img.src = data.result
                    /* if(val!==""){
                        resize_img(img,val);
                    }*/
                  writeToTable(url, data.result)
                } else {
                  showError(data.result)
                }
            }); })
    })
}

function writeToTable (urlIn, urlOut, timestamp) {
  var db = getCurrentDb()
  db.transaction(function (trans) {
      trans.executeSql('insert into urlCache (urlIn,urlOut,timeStamp) values (?,?,?) ', [urlIn, urlOut, timestamp], function (ts, data) {
          if (data) {

            } else {

            }
        }, function (ts, message) {
        // alert(message);
        })
    })

}

function updateToTable (urlIn, urlOut, timestamp) {
  var db = getCurrentDb()
  db.transaction(function (trans) {
      trans.executeSql('UPDATE urlCache SET urlOut=?,timeStamp=? WHERE urlIn=?', [urlOut, timestamp, urlIn], function (ts, data) {
          if (data) {

            } else {

            }
        }, function (ts, message) {
           // alert(message);
        })
    })
}

function delTable () {
  var db = getCurrentDb()
  db.transaction(function (trans) {
      trans.executeSql('DROP TABLE urlCache', [], null, function (trans, message) { console.log(message) })
    })
}

initDatabase()
/** 以上是url缓存函数,内部使用   **/

/** ajax 核心函数  **/
function iwx_ajax(url,ajaxType,paramJSON,successHandler,errorHandler,onChangeHandler){
    //ajaxType转为全大写
    ajaxType=ajaxType.toUpperCase();
    var xhr=new XMLHttpRequest();
    var paramStr='';
    if(paramJSON!=null){
        paramStr=join_object_to_query_string(paramJSON);
    }
    xhr.data=Array.prototype.slice.call(arguments);
    //分别实现success和error方法
    xhr.onreadystatechange=function(){
        switch (xhr.readyState){
            //==4的时候要判断
            case 4:
                if(xhr.status==200){
                    var dataJSON=JSON.parse(xhr.responseText);
                    if(dataJSON != null && dataJSON.code==100){
                        if (successHandler != null) {
                            if(ajaxType==='GET'){
                                var saved_object=get_cache(url,'');
                                if(saved_object!=='' && (JSON.stringify(saved_object) == JSON.stringify(dataJSON))){
                                    iwxiao_debug && console.log('object is same as cache');
                                }else{
                                    successHandler(dataJSON);
                                    cache_object(url,dataJSON);
                                }
                            }else{
                                successHandler(dataJSON);
                            }
                        }
                    }else if(dataJSON != null && dataJSON.code==1206){
                        refresh_authid(iwx_ajax,this.data);
                    }else{
                        if (errorHandler != null){
                            errorHandler(dataJSON);//服务器正常,返回数据异常
                        }else{
                            showError(dataJSON.result);
                        }
                    }
                }else{
                    if(errorHandler != null){
                        errorHandler({'code':2999,'result':xhr.responseText});
                    }else{
                        console.log('Network failed!');
                    }
                }
                break;
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                if(onChangeHandler != null) onChangeHandler();
                break;
            default:
                console.log('unkonwReadyState:'+xhr.readyState);//预防浏览器崩溃
        }
    }
    if(paramJSON!=null&&ajaxType==='GET'){
        url=url+'?'+paramStr;
        var cache_obj=get_cache(url,'');
        if(cache_obj !== ''){
            successHandler(cache_obj);
        }
    }
    xhr.open(ajaxType,url,true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(paramJSON!=null&&ajaxType==='POST'){
        xhr.send(paramStr);
    }else{
        xhr.send();
    }
}

function cache_object(key,ob){
    sessionStorage.setItem(key,JSON.stringify(ob));
}

function get_cache(key,default_obj){
    var json_str=sessionStorage.getItem(key);
    return json_str===null?default_obj:JSON.parse(json_str);
}

function refresh_authid (callback, args) {
  var my_callback = callback
  var my_arguments = args
  var login_info = get_object(iwx_local_data.account.login_info)
  if (isEmpty(login_info) || login_info.token == '') {
      var my_url = join_object_to_query_string({link_url:location.href})
      show_confirm('您还未登录不能访问,选择是进入登录页面', function (conform) {
          if (conform) {
              location.assign(iwxiao_url.account.login + '?' + my_url)
            }
        })
    } else {
      postJSON(iwxiao_url.account.get_login, {token:login_info.token}, function (jsonObj) {
          jsonObj.result.token = login_info.token
          save_object(iwx_local_data.account.login_info, jsonObj.result)
          if (my_callback != null && my_arguments == null) {
             my_callback()
           } else if (my_callback != null && my_arguments != null) {
             my_arguments[2].authid = jsonObj.result.authid
             my_callback(my_arguments[0], my_arguments[1], my_arguments[2], my_arguments[3], my_arguments[4], my_arguments[5])
           }
        })
    }
}


export function getJSON () {
  switch (arguments.length) {
      case 1:
        iwx_ajax(arguments[0], 'GET', null, null, null, null)
        break
      case 2:
        if (typeof arguments[1] == 'function') {
              iwx_ajax(arguments[0], 'GET', null, arguments[1], null, null)
            } else {
              iwx_ajax(arguments[0], 'GET', arguments[1], null, null, null)
            }
        break
      case 3:
        iwx_ajax(arguments[0], 'GET', arguments[1], arguments[2], null, null)
        break
      case 4:
        iwx_ajax(arguments[0], 'GET', arguments[1], arguments[2], arguments[3], null)
        break
      default :
        return
    }
}

export function postJSON () {
  switch (arguments.length) {
      case 1:
        iwx_ajax(arguments[0], 'POST', null, null, null, null)
        break
      case 2:
        if (typeof arguments[1] == 'function') {
              iwx_ajax(arguments[0], 'POST', null, arguments[1], null, null)
            } else {
              iwx_ajax(arguments[0], 'POST', arguments[1], null, null, null)
            }
        break
      case 3:
        iwx_ajax(arguments[0], 'POST', arguments[1], arguments[2], null, null)
        break
      case 4:
        iwx_ajax(arguments[0], 'POST', arguments[1], arguments[2], arguments[3], null)
        break
      default :
        return
    }
}

function fit_img (img) {
  var fit_length = img.parentElement.offsetHeight
  if (img.getAttribute('fitted') != '1') {
      if (img.clientHeight > img.clientWidth) {
          img.style.width = fit_length + 'px'
        } else {
          img.style.height = fit_length + 'px'
        }
      img.setAttribute('fitted', '1')
    }
}

/**
 * show a slide panel to display el (imagine tag)
 * @param el
 */

function slide_imagins (el) {
  var img_div = el.parentNode
  var index = Array.prototype.indexOf.call(img_div.parentNode.children, img_div)
  var blog_pic_list = img_div.parentNode.cloneNode(true)
  Array.prototype.forEach.call(blog_pic_list.children, function (el) {
      el.children[0].style.width = 'auto'
      el.children[0].style.height = 'auto'
    })
  var img_display_panel = document.createElement('div')
  img_display_panel.classList.add('image_shower')
  img_display_panel.innerHTML = '<div class="img_scroll"></div><div class="close_btn"><img src="../../common/img/chazi@2x.png"/></div>'
  img_display_panel.children[0].appendChild(blog_pic_list.cloneNode(true))
  img_display_panel.getElementsByClassName('close_btn')[0].addEventListener('click', function (e) {
      img_display_panel.remove()
    })
  document.body.appendChild(img_display_panel)
  setTimeout(function () { document.img_iScroll = new IScroll(img_display_panel.children[0], {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true,
      snapSpeed: 400
    })
      document.img_iScroll.scrollToElement(document.img_iScroll.scroller.children[index])
    }, 200)

}

/**
 * change location query string to jsonObj.
 * @returns {boolean}
 */


function get_query_json () {
  var query_string = location.search
  if (query_string == '') return false
  var query_string_list = query_string.substr(1).split('&')
  query_string_list.forEach(function (str, index, list) {
      var str_list = str.split('=')
      list[index] = '"' + str_list[0] + '":"' + decodeURIComponent(str_list[1]) + '"'
    })
  return JSON.parse('{' + query_string_list.join(',') + '}')
}

/**
 * from {a:3,b:4} to "a=3&b=4"
 * @param ob object
 * @returns {string}
 */

export function join_object_to_query_string (ob) {
  var paramStr = ''
  for (var param in ob) {
      paramStr += '&' + param + '=' + encodeURIComponent(ob[param]) 
    }
  return paramStr.substr(1)
}

/*
function join_object_to_path_info(ob){
    var paramStr='';
    for (var param in ob){
        paramStr += '/' + param + '/' + encodeURIComponent(ob[param]) ;
    }
    return paramStr;
}
*/

/**
 * save object to local_storage service
 * @param key key to data
 * @param ob object of data
 */


export function save_object (key, ob) {
  localStorage.setItem(key, JSON.stringify(ob))
}

/**
 * get object from local_storage service
 * @param key
 */

export function get_object (key, obj) {
  var objStr = localStorage.getItem(key)
  obj = obj || false
  return isEmpty(objStr) ? obj:JSON.parse(localStorage.getItem(key))
}

export function get_authid () {
  var login_info = get_object(iwx_local_data.account.login_info)
  if (isEmpty(login_info)) {
      show_confirm('此功能需要登录!点确定前往登录页面', function (confirm) {
          if (confirm) {
              location.assign(iwxiao_url.account.login + '?' + join_object_to_query_string({link_url:location.href}))
            } else {
              return false
            }
        })
      return false
    }
  return login_info.authid
}



export function show_tips (text, timeout, type, callback) {
  if (undefined == type) {
      type = true
    }
  if (undefined == timeout) {
      timeout = 1000
    }
  var ele
  if (type) {
      ele = '<div class="modal_base"><div class="modal_body"><div class="modal_title">' + text + '</div><div class="img"><img src="../../assets/succ@2x.png"></div></div></div>'
    } else {
        // 错误弹窗,暂时没有错误图片,待定
      ele = '<div class="modal_base"><div class="modal_body"><div class="modal_title">' + text + '</div><div class="img"><img src="../../assets/error@2x.png"></div></div></div>'
    }
  var modal_window = parseElFromString(ele)
  document.body.appendChild(modal_window)
  setTimeout(function () {
      modal_window.remove()
      callback != null && callback()
    }, timeout)
}
/*
 * TODO:弹出一个带确定按钮和取消按钮的模态框
 * text:显示的文本[必须]
 * callback(date):回调函数,当点击确定时data为ture,取消时为false
 *
 * */
export function show_confirm (text, callback) {
  if (undefined == callback) {
      callback = function () {}
    }
  var eleStr = '<div class="modal_confirm"><div class="modal_body"><div class="modal_title"><span>' + text + '</span></div><div class="modal_footer"><span style="border-right: 1px solid #b1b1b1;" id="modal_btn_ok">确定</span><span id="modal_btn_cancel">取消</span></div></div></div>'
  var modal_window = parseElFromString(eleStr)
  document.body.appendChild(modal_window)
  document.getElementById('modal_btn_ok').addEventListener('click', function () {
      callback(true)
      modal_window.remove()
    })
  document.getElementById('modal_btn_cancel').addEventListener('click', function () {
        // callback(false);
      modal_window.remove()
    })
}
/*
 * TODO:弹出一个带确定按钮和取消按钮的模态框
 * text:显示的文本[必须]
 * callback:回调函数
 * */
export function show_alert (text, callback) {
  if (undefined == callback) {
      callback = function () {}
    }
  var eleStr = '<div class="modal_alert"><div class="modal_body"><div class="modal_title"><span>' + text + '</span></div><div class="modal_footer" id="modal_alert_btn">确定</div></div></div>'
  var modal_window = parseElFromString(eleStr)
  document.getElementsByTagName('body')[0].appendChild(modal_window)
  document.getElementById('modal_alert_btn').addEventListener('click', function () {
      callback()
      modal_window.remove()
    })
}

/**
 * test whether the obj is useless
 * @param obj
 * @returns {boolean}
 */

export function isEmpty (obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '' || obj === 0 || obj === false) {
      return true
    } else if (typeof obj === 'object' && (obj.length === 0 || JSON.stringify(obj) =='{}')) {
      return true
    }
  return false
}

/**
 * get location and address
 * @param callback  =function(X,Y,address){};
 * @returns {boolean}
 */

function get_location (callback) {
  const map_url = 'http://www.iwxiao.com/get_address.php'
  const token = 'iwxiao_geo_get_api'
  if (isEmpty(cordova)) return false
  var geo_options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
  var on_geo_success = function (position) {
      var lon = position.coords.longitude  // 经度X
      var lat = position.coords.latitude   // 纬度Y
      getJSON(map_url, {token:token, X:lon, Y:lat}, function (data) {
          callback(lon, lat, data.result)
        })
    }
  var on_geo_error = function (err) {
      show_tips(err.message, 1000, false)
    }
  navigator.geolocation.getCurrentPosition(on_geo_success, on_geo_error, geo_options)
}

export function open_outer_url(url){
    if(!isEmpty(window.cordova) && !isEmpty(window.cordova.InAppBrowser)){
        window.cordova.InAppBrowser.open(url, "_blank", 'location=no');
    }else{
        location.href=url;
    }
}

export function get_idfa(){
    "use strict";
    if(isEmpty(window.device)){
        return 'iyouhui';
    }else{
        return window.device.uuid;
    }
}