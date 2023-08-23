<template>
    <div id="app">
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
      },
      mounted: function(){
      },
    }
    </script>
  