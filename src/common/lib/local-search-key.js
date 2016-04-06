/**
 * Created by caoyang on 16/4/1.
 */
import {save_object,get_object} from './functions'
import {iwx_local_data} from './const'
var local_search_array=get_object(iwx_local_data.account.search_key,[]);

export function save_search_key(key){
    let key_index=local_search_array.findIndex((word)=> key===word);
    if(key_index===-1){
        if(local_search_array.length>=10) {
            local_search_array.pop()
        }
    }else{
        local_search_array.splice(key_index,1)
    }
    local_search_array.shift(key)
    save_object(iwx_local_data.account.search_key,local_search_array);
}

export function get_search_key(){
    return local_search_array;
}