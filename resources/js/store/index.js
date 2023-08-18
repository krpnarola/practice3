
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

//CMD
//npm install --save vuex-persistedstate


import auth from "./modules/auth";

const store = createStore({
    modules: {
        auth,
    },
    plugins: [createPersistedState()],
  });

export default store;

//// Load Vuex
// Vue.use(Vuex);

// // Create store
// export default new Vuex.Store({
//   modules: {
//     auth,
//   },
//   plugins: [createPersistedState()],
// });



// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
// export default createStore({
//     state: {
//         full_name: 'Krunal Patel',
//         allData: [],
//         users: [],
//         sessionLoaded:false
//     },
//     mutations: {
//         setCurrentname(state, payload){
//             state.full_name = payload;
//             state.allData.push(payload);
//         },
//         SAVE_USERS(state, users) {
//             state.users = users;
//         },
//         changeSessionLoaded: function (state)
//         {
//             state.sessionLoaded = true;
//         }
//     },
//     actions:{
//         // loadUsers({commit}) {
//         //     alert('load. actin');
//         //     axios.get('users').then(result => {
//         //         console.log(result);
//         //       commit('SAVE_USERS', result.data);
//         //     }).catch(error => {
//         //       throw new Error(`API ${error}`);
//         //     });
//         // }
//         // loadUsers: async function(){
//         //     alert('load ac');
//         //     const data = await fetch('https://jsonplaceholder.typicode.com/users');
//         //     const actividades = await data.json();
//         //     this.commit('SAVE_USERS', actividades);
//         // },
//         loadUsers: async function ({ commit }) {
//             alert('API');
//             try {
//                const response = await fetch('https://jsonplaceholder.typicode.com/users');
//                const actividades = await response.json();
//                console.log(actividades);
//                // JSON responses are automatically parsed.
//                commit('SAVE_USERS', actividades)
//              }
//              catch (error) {
//               console.log(error);
//             }
//           }
//     },
//     modules:{},
//     getters:{
//         getCurrentName: state => state.full_name,
//         getCurrentUser: state => state.users
//         // getCurrentUser: state => {
//         //     return state.users;
//         //   }
//     }
// });