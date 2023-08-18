<template>
    <div class="home">
      <!-- <h3>Name: {{ name }}</h3> -->
      <div  style="display: inline-block;" v-for="user in users" v-bind:key="user.id">
        <h2>{{ user.id }}</h2>
        <p>{{ user.name }}</p>
      </div>

      <TableComponent :ajax="ajax" :columns="columns" :options="options" />
    </div>
  </template>
  
  <script>
  import TableComponent from '../components_file/TableComponent.vue';
  export default {
    name: 'Home',
    components:{
      TableComponent
    },
    data () {
      return {
        name: '',
        msg: 'Welcome to Your Vue.js App',
        columns: [
            { data: 'id', title: 'Id', orderable: false, sortable: true, searchable: true },
            { data: 'name', title: 'Name', orderable: false, sortable: true, searchable: true },
            { data: 'email', title: 'Email', orderable: false, sortable: true, searchable: true, },
            { data: 'created_at', title: 'Created_at', orderable: false, sortable: true, searchable: true},
        ],
        ajax: 'api/get-users',
        options:{
                  dom: 'Bflrtip',
                  // "dom": 'lrtip',
                  // "lengthMenu": [ 10, 25, 50, 75, 100 ],
                  "pageLength": 10,
                  buttons: [
                      {
                          extend: 'print',
                          exportOptions: {
                            columns: ':visible'
                          }
                      },
                      {
                          extend: 'copyHtml5',
                          exportOptions: {
                            columns: ':visible'
                          }
                      },
                      {
                          extend: 'csvHtml5',
                          exportOptions: {
                              columns: ':visible'
                          }
                      },
                      {
                          extend: 'pdf',
                          exportOptions: {
                            columns: ':visible'
                          }
                      },
                      'colvis'
                  ],
                  select: true,
                  serverSide: true,
                  // stateSave: true,
                  responsive:true, 
                  autowidth:false,
                  order:[[0,"desc"]],
                  columnDefs: [{
                      target: 0,
                      visible: false,
                      searchable: false,
                    },
                    { className: "text_search", "targets": [ 1 ] },
                    { className: "select_search", "targets": [ 2 ] }
                    // {
                    //     width: '15%',
                    //     targets: [6], 
                    // }
                  ],
                  initComplete: function(){
                    this.api().columns().every(function () {
                      var column = this;
                      console.log($(this));
                      if ($(column.footer()).hasClass('select_search')) { 
                      } else {
                        console.log(this);
                        var that = this;
                        console.log(this.footer());
                        $('input', this.footer()).on('keyup', function () {
                            // that.search(this.value).draw();
                            that.columns(1).search(this.value).draw();
                        });
                      }
                    });
                  }
                }
      }
    },
    created() {
      // this.$store.dispatch('loadUsers');
    },
    computed: {
      // users() {
      //   console.log('comp');
      //   return this.$store.getters.getCurrentUser;
      // }
      // $session: function () { return this.$store.state.sessionLoaded; },
      
      // $session: function () { 
      //   alert('get session');
      //   this.$store.dispatch('loadUsers');
      //   return this.$store.state.users; 
      // },
      users() {
        // console.log('------');
        // console.log(this.$store.getters.getCurrentUser);
        // console.log('------');
        //   return this.$store.getters.getCurrentUser;
      },
    },
    mounted: function(){
      this.name = this.$store.getters.StateUser;
      // console.log(store.getters.;
      // console.log(this.$store.getters.getCurrentUser);
      const vm = this;
      // this.$store.commit("changeSessionLoaded");
      // this.$store.dispatch('loadUsers');
      // alert('print..');
      // console.log(this.users);
      setTimeout(() => {
        
      }, 100);
      // console.log(this.$store.getters.getCurrentUser);
      // setTimeout(function(){
      //   console.log(vm.$store.state.users);
      // }, 1000);
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>