import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Home from './components/HomePage'

Vue.use(Router);

var router = new Router();

router.map({
  '/home':{
    component:Home
  }
});

router.redirect({
  '/':'/home'
});

router.start(App, '#app');
