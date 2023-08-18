

<template>
 <div id='account-info'   class="text-danger">
    <button @click='changeUsername()'>Change Username</button>

   {{username}}
 </div>
</template>
 
<script>
export default {
    props: {
        username: String
    },
    methods: {
        changeUsername(){
            alert('Change...');
            this.$emit('changeUsername', 'Inline KRP')
        }
    },
}
</script>

<style scoped>
    .text-danger{
        color: red;
    }
   </style>