/**
 * Created by xieyunwe on 16-3-31.
 */
import {REFRESH_LOCATION} from '../mutation-types'
import {save_object,get_object} from '../../common/lib/functions'
import {iwx_local_data} from '../../common/lib/const'

let default_location_info = {"location_id":"1","father_location_id":"0","location_name":"北京","hot_level":"1"};
var location_info=get_object(iwx_local_data.account.current_location_info,default_location_info);

const state={    
    locationInfo:location_info,
};
const mutations={
    
    [REFRESH_LOCATION](state,locationInfo){
        save_object(iwx_local_data.account.current_location_info,locationInfo);
        state.locationInfo=locationInfo;
    }

};

export default {
    state,
    mutations
}
