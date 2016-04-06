<style>
  #app{
    position: absolute;
    height: 100%;
    overflow: hidden;
  }
</style>

<template>
  <div id="app">
    <router-view
            class="view"
            keep-alive
            transition
            transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
import store from './vuex/store'
    import {AppEvents} from './common/lib/events-types'
    import {parseElFromString} from './common/lib/functions'
    export default {
        data() {
            return {
                msgBox:{}
            }
        },
        components: {

        },
        store,
        methods:{

        },
        ready:function(){

        },
        events:{
            
        }
    }



</script>
