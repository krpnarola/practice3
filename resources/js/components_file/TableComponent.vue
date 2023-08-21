<template>
    <div class="container">

      <div class="table-responsive">
        <DataTable id="table_component" :ajax="ajax" ref="table" :columns="columns" :options="options" class="display nowrap"></DataTable>
      </div>

    </div>
  </template>

  <script>
    //Datatable
    import DataTable from 'datatables.net-vue3';
    import DataTablesCore from 'datatables.net-bs5';
  
    import DataTableLib from 'datatables.net-bs5';
    import Buttons from 'datatables.net-buttons-bs5';
    import ButtonsHTml5 from 'datatables.net-buttons/js/buttons.html5';
    import print from 'datatables.net-buttons/js/buttons.print';
    import pdfmake from 'pdfmake';
    import pdfFonts from 'pdfmake/build/vfs_fonts';
    // pdfmake.vfs = pdfFonts.pdfmake.vs;
    pdfmake.fonts = {
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
 }

    import 'datatables.net-responsive-bs5';

    // import DataTablesCore from 'datatables.net';
    import 'datatables.net-select';
    import 'datatables.net-responsive';
    import JsZip from 'jszip';
    window.JsZip = JsZip;

    DataTable.use(DataTablesCore);
    DataTable.use(Buttons);
    DataTable.use(pdfmake);
    DataTable.use(ButtonsHTml5);

    export default {
      name: 'TableComponent',
      components: {
        DataTable
      },
      props: {
        columns: {
          type: Array,
          required: true,
        },
        data: {
          type: Array,
          required: true,
        },
        ajax: {
         type: String,
         required: true,
        },
        options: {
          type: Array,
         required: true,
        }
      },
      data(){
        return {
          // columns_data : columns,
          // options : options,
        }
      }
    }
    </script>


<style scoped>
    table {
      /* width: 100%; */
      border-collapse: collapse;
    }
    @import 'datatables.net-dt';
    @import 'datatables.net-bs5';

    @import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-select-dt';
    </style>