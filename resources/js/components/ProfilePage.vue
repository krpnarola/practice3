<template>
    <div>
        <!-- <account-info :username="user.username" @changeUsername="user.username = 'new name'"/> -->
        <account-info :username="user.username" @changeUsername="user.username = $event"/>
      <!-- <account-info :username="user.username" @changeUsername="doChangeUsername()"/> -->
    </div>
   </template>
    
   <script>
   import AccountInfo from "@/components/AccountInfo.vue";
    
   export default {
    components: {
      AccountInfo
    },
    data() {
      return {
        user: {
          username: ''
        },
      }
    },
    mounted: function(){
        this.user.username = 'KRUNAL PATEL';
    },
    methods:{
        doChangeUsername(){
            this.user.username = 'Sreerag Nair';
        }
    },
   }
   </script>