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

  const exportOptions = {
  columns: ':visible',
  format: {
    header: function (data) {
      return $('<div></div>')
        .append(data)
        .find('.cb-dropdown-wrap')
        .remove()
        .end()
        .text()
    }
  }   
}
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
                  processing: true,
                  // "dom": 'lrtip',
                  // "lengthMenu": [ 10, 25, 50, 75, 100 ],
                  "pageLength": 10,
                  buttons: [
                      {
                          extend: 'print',
                          exportOptions: exportOptions
                      },
                      {
                          extend: 'copyHtml5',
                          exportOptions: exportOptions
                      },
                      {
                          extend: 'csvHtml5',
                          exportOptions: exportOptions
                      },
                      {
                          extend: 'pdf',
                          exportOptions: exportOptions
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
                    this.api().columns([1,2]).every(function (k, val) {
                      var column = this;
                      var column_head = $(column.header())[0];
                      column_head = $(column_head).text();
                    //   if ($(column.footer()).hasClass('select_search')) { 
                    //   } else {
                    //     // console.log(this);
                    //     var that = this;
                    //     // console.log(this.footer());
                    //     if(k == 0){
                    //       $('.search_text_name', this.footer()).on('keyup', function () {
                    //           // that.search(this.value).draw();
                    //           that.columns(1).search(this.value).draw();
                    //       });
                    //     }
                    //   }
                var select = $('<select class="cb-dropdown-wrap"><option value=""></option></select>')
                    .appendTo( $(column.header()))
                    .on( 'change', function () {
                        // var val = $.fn.dataTable.util.escapeRegex(
                        //     $(this).val()
                        // );
                        var val = $(this).val();
                        column.search( val ? '^'+val+'$' : '', true, false ).draw();
                    } );
                    if(column_head.toLowerCase() == 'name'){
                      axios.get('api/get-user-name').then(result => {
                        $(result.data.user_names).each(function(k, value){
                          select.append( '<option value="'+value.name+'">'+value.name+'</option>' )
                        });
                        
                      });
                    }else if(column_head.toLowerCase() == 'email'){
                      axios.get('api/get-user-email').then(result => {
                        $(result.data.emails).each(function(k, value){
                          select.append('<option value="'+value.email+'">'+value.email+'</option>')
                        });
                      });
                    }
                    else{
                      column.data().unique().sort().each( function ( d, j ) {
                          select.append( '<option value="'+d+'">'+d+'</option>' )
                      } );
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
  $(document).ready(function(){
      $("#table_component").append(
        $('<tfoot/>').append( $("#table_component thead tr").clone() )
      );
      $('#table_component tfoot th').each(function () {
        var title = $(this).text();
        // console.log($(this)[0].className);

        const className = $(this)[0].className;
        const substring = "text_search";
        if (className.includes(substring)) {
          $(this).html('<input type="text" placeholder="Search ' + title + '" class="search_text_name" />');
        }
    });

    $("#table_component tfoot th").each( function ( i ) {
    //   var table = $('#table_component');
    //   if ($(this).text() !== '') {
    //     console.log($(this).text());
    //     var isStatusColumn = (($(this).text() == 'Status') ? true : false);
    //     var select = $('<select><option value=""></option></select>')
	  //           .appendTo( $(this).empty() )
	  //           .on( 'change', function () {
	  //               var val = $(this).val();
					
	  //               table.column( i )
	  //                   .search( val ? '^'+$(this).val()+'$' : val, true, false )
	  //                   .draw();
	  //           });
    //     // Get the Status values a specific way since the status is a anchor/image
    //     if (isStatusColumn) {
          
    //     }else{
    //       table.column( i ).data().unique().sort().each( function ( d, j ) {  
		// 			select.append( '<option value="'+d+'">'+d+'</option>' );
		//         } );	
    //     }
        
    //   }
    });
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>