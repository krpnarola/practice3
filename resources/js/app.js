import './bootstrap';

import {createApp} from 'vue'

import App from './App.vue'
import router from './router';

import store from './store';
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.interceptors.response.use(undefined, function(error) {

    if (error) {
          const originalRequest = error.config;
          console.log(error.response);
          if (error.response.status === 401 && !originalRequest._retry) {
          alert('INETER.');
        originalRequest._retry = true;
        store.dispatch("LogOut");
        return router.push("/login");
      }
    }
  });

const app = createApp(App)

router.beforeEach((to, from)=>{
    // axios.get('api/users').then(result => {
    //     console.log(result.data);
    //       // store.getUserInfo.isAuthenticated
    //     });
    // store.dispatch('getUserInfo');

    setTimeout(() => {
        // alert(store.getters.StateUser)
    }, 1000);
    // alert(['app.'])
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    // const actividades = await response.json();
    // console.log(actividades);
    // // JSON responses are automatically parsed.
    // commit('SAVE_USERS', actividades)

        // axios.get('users').then(result => {
        //     // console.log('**********');
        //     // // console.log(result);
        //     // console.log('**********');
        //     // store.commit('SAVE_USERS', result.data);
        // }).catch(error => {
        //     throw new Error(`API ${error}`);
        // });

        

        // console.log(result);
        setTimeout(function(){
            // console.log('**********');
            // console.log(store.getters.getCurrentUser)
            // console.log('**********');
        }, 1000);
});
app.use(router);
app.use(store);
app.mount("#app")
