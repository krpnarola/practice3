<template>
  <div class="home">
     <!-- <h3>Name: {{ name }}</h3> -->
     <div  style="display: inline-block;" v-for="user in users" v-bind:key="user.id">
        <h2>{{ user.id }}</h2>
        <p>{{ user.name }}</p>
     </div>
     <div class="table-responsive">
       <TableComponent class="table table-striped table-bordered dataTable display" :ajax="ajax" :columns="columns" :options="options" />
     </div>
  </div>
</template>
<script>
  //Begin Table Component
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
  //End Table Component
  
  export default {
    name: 'Home',
    components:{
      TableComponent
    },
    data () {
      return {
        name: '',
        msg: 'Welcome to Your Vue.js App',
        columns: [],
        ajax: 'api/get-users',
        options:{
                  dom: 'Bflrtip',
                  processing: true,
                  responsive: true,
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
                    
                  ],
                  initComplete: function(settings, json){
                    // Setup - add a text input to each footer cell
                    $('#table_component thead tr').clone(true).addClass('filters').appendTo('#table_component thead');
                    
                    var api = this.api();
                    // For each column
                    
                    api.columns().eq(0).each(function (colIdx) {
                      if(colIdx == 0){
                        return true;
                      }
                      // Set the header cell to contain the input element
                          var cell = $('.filters th').eq(
                            $(api.column(colIdx).header()).index()
                            );
                            var title = $(cell).text();
                            console.log(title);
  
                          if(title.toLowerCase() == 'name'){
                            // if (!api.column(colIdx).searchable()) {
                            //   return false;
                            // }
                            var select = $('<select class="cb-dropdown-wrap" style="width:100%"><option value="">All</option></select>') .on( 'change', function () {
                                var val = $(this).val();
                                api.column(colIdx).search( val ? '^'+val+'$' : '', true, false ).draw();
                            } );
                            axios.get('api/get-user-name').then(result => {
                              $(result.data.user_names).each(function(k, value){
                                select.append('<option value="'+value.name+'">'+value.name+'</option>')
                              });
                            });
                            $(cell).html(select)
                            
                          }else if(title.toLowerCase() == 'email'){
                            var select = $('<select class="cb-dropdown-wrap" style="width:100%"><option value="">All</option></select>') .on( 'change', function () {
                                var val = $(this).val();
                                api.column(colIdx).search( val ? '^'+val+'$' : '', true, false ).draw();
                            } );
                            axios.get('api/get-user-email').then(result => {
                              $(result.data.emails).each(function(k, value){
                                select.append('<option value="'+value.email+'">'+value.email+'</option>')
                              });
                            });
                            $(cell).html(select)
                          }
                          else{
                            $(cell).html('<input type="text" placeholder="' + title + '" />');
                          }
                          console.log(title.toLowerCase());
  
                          // On every keypress in this input
                        $('input',$('.filters th').eq($(api.column(colIdx).header()).index())).off('keyup change')
                        .on('change', function (e) {
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '({search})'; //$(this).parents('th').find('select').val();
  
                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api.column(colIdx).search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                ).draw();
                        }).on('keyup', function (e) {
                            e.stopPropagation();
                            $(this).trigger('change');
                            // $(this).focus()[0].setSelectionRange(cursorPosition, cursorPosition);
                        });
                      })
                  $('#is_filter_load').val(1);
                  },
                }
      }
    },
    created() {
      // alert(this.$store.getters.StateColumn)
      var details = [
            { data: 'id', title: 'Id', orderable: false, sortable: true, searchable: true },
            { data: 'name', title: 'Name', orderable: false, sortable: true, searchable: true },
            { data: 'email', title: 'Email', orderable: false, sortable: true, searchable: true, },
            { data: 'created_at', title: 'Created_at', orderable: false, sortable: true, searchable: true},
        ];
      var specificValuesFromArray = details.filter(obj => obj.data == 'id'  || obj.data == 'name' || obj.data == 'email' || obj.data == 'created_at');
      console.log( [
            { data: 'id', title: 'Id', orderable: false, sortable: true, searchable: true },
            { data: 'name', title: 'Name', orderable: false, sortable: true, searchable: true },
            { data: 'email', title: 'Email', orderable: false, sortable: true, searchable: true, },
            { data: 'created_at', title: 'Created_at', orderable: false, sortable: true, searchable: true},
        ]);
      console.log(specificValuesFromArray);
      return this.columns = specificValuesFromArray
    },
    computed: {
      // users() {
      // }
    },
    mounted: function(){
      this.name = this.$store.getters.StateUser;
      // console.log(this.$store.getters.getCurrentUser);
      const vm = this;
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js')
      document.head.appendChild(recaptchaScript)
    },
    method:{
    }
  }
  $(document).ready(function(){
    //Select2 apply if there is an element.
    var load_select2 = setInterval(function(){ 
        if($('#is_filter_load').val() == 1){
          selectPicker();
          clearInterval(load_select2);
        }
       }, 1000);
    setTimeout(function() { clearInterval(load_select2); }, 10000);
  
    //Select2
    function selectPicker(){
      if($(".cb-dropdown-wrap").length > 0){
        $(".cb-dropdown-wrap").select2({
          maximumSelectionLength: 2,
        })
      }
    } 
  });
</script>