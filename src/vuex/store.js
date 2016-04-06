/**
 * Created by caoyang on 16/3/14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import AuthInfo from './modules/Authinfo'
import LocationInfo from './modules/LocationInfo'
import {iwxiao_debug} from '../common/lib/const'

Vue.use(Vuex);
Vue.config.debug = iwxiao_debug;

export default new Vuex.Store({
    modules: {
        AuthInfo,
        LocationInfo
    },
    strict: iwxiao_debug
})