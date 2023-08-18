<template>
    <div id="app">
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
           </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
           </li> -->
    
           <NavBar />
      <router-view/>
      
    </div>
  </template>
  <script>
    import axios from 'axios';
    import NavBar from "@/components/layout/NavBar.vue";
    axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

    export default {
      name: 'App',
      components: {
        NavBar
      },
      created: function(){
        //  alert('main');
      },
      mounted: function(){
        // const isLoading = true;
        // var vm = this;
        // const onDownload = async () => {
        //     // isLoading.value = true;
        //     try {
        //         alert('ss');
        //         this.$store.dispatch('loadUsers');
        //         const { data } = await axios.get('users')
        //         // handle the response
        //     } catch (error) {
        //     console.log(error);
        //     } finally {
        //     // isLoading.value = false;
        //     }
        // };
        
        // // invoke the function
        // onDownload();

        // this.$store.dispatch('loadUsers');
      },
    }
    </script>
    
    <style>
    #app {
      
    }
    </style>