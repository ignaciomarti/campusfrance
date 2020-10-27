// LOADER 
$( window ).on('load', function() {
    $('.se-pre-con').fadeOut('slow');
});


jQuery(document).ready(function () {

    // MAPA ARGENTINA
    jQuery('#argentineMap').vectorMap({
      map: 'argentina_en',
      backgroundColor: 'transparent',
      enableZoom: false,
      showTooltip: true,
      color: '#1c92d0',
      hoverColor: '#e10811',
      selectedColor: '#e10811',
      onRegionClick: function (element, code, region) {
          $('#provinceInfo').html(region + ' (40)');
        var message = 'You clicked "'
          + region
          + '" which has the code: '
          + code.toUpperCase();

        console.log(message); // Do Something
      }
    });

    // MAPA FRANCIA
    jQuery('#franceMap').vectorMap({
      map: 'france_fr',
      backgroundColor: 'transparent',
      enableZoom: false,
      showTooltip: true,
      color: '#1c92d0',
      hoverColor: '#e10811',
      selectedColor: '#e10811',
      onRegionClick: function (element, code, region) {
          $('#provinceInfo').html(region + ' (40)');
        var message = 'You clicked "'
          + region
          + '" which has the code: '
          + code.toUpperCase();

        console.log(message); // Do Something
      }
    });

    // SELECTS FORMULARIOS
    $('.argentineInstitutions').select2({
        placeholder: 'Institución argentina',
        allowClear: true,
        width: '100%',
    });
    $('.argentineProvinces').select2({
        tags: true,
        placeholder: 'Provincia argentina',
        allowClear: true,
        width: '100%',
    });
    $('.frenceInstitutions').select2({
        placeholder: 'Institución francesa',
        allowClear: true,
        width: '100%',
    });
    $('.franceRegions').select2({
        tags: true,
        placeholder: 'Región francesa',
        allowClear: true,
        width: '100%',
    });
    $('.movilityType').select2({
        placeholder: 'Tipo de Movilidad',
        allowClear: true,
        width: '100%',
    });
    $('.branch').select2({
        placeholder: 'Rama',
        allowClear: true,
        width: '100%',
    });
    $('.discipline').select2({
        placeholder: 'Disciplina',
        allowClear: true,
        width: '100%',
    });
    $('.program').select2({
        placeholder: 'Programa',
        allowClear: true,
        width: '100%',
    });


    // CAMBIO DE MAPA
    $('#argentineMap').show();
    $('#franceMap').hide();
    $('#dataTable').hide();
    $('.change-view').removeClass('d-flex').hide();
    $('#argentineFlag').on('click', function() {
      $('#franceMap').hide();
      $('#provinceInfo').html('');
      $('#argentineMap').show();
      $(this).addClass('selected');
      $('#franceFlag').removeClass('selected');
    })
   $('#franceFlag').on('click', function() {
      $('#argentineMap').hide();
      $('#provinceInfo').html('');
      $('#franceMap').show();
      $(this).addClass('selected');
      $('#argentineFlag').removeClass('selected');
   })
   $('.carousel-map-next, .carousel-map-prev').on('click', function() {
       if ($('#franceMap').css('display') == 'none') {
            $('#provinceInfo').html('');
            $('#argentineMap').hide();
            $('#franceMap').show();
            $('#franceFlag').addClass('selected');
            $('#argentineFlag').removeClass('selected');
       } else if ($('#argentineMap').css('display') == 'none') {
            $('#provinceInfo').html('');
            $('#franceMap').hide();
            $('#argentineMap').show();
            $('#argentineFlag').addClass('selected');
            $('#franceFlag').removeClass('selected');
       }
   })

   // SELECT DE PROVINCIAS ARGENTINAS
  $.get('https://apis.datos.gob.ar/georef/api/provincias', function(data){
      let provinces = [];
      $.each(data.provincias, function(i,province) {
          provinces.push(province.nombre);
      })
      provinces.sort();
      $.each(provinces, function (i, province) {
          let option = new Option(province, province, false, false);
          $('.argentineProvinces').append(option).trigger('change');
      });
  });

  // SELECT DE REGIONES FRANCESAS
  $.get('https://geo.api.gouv.fr/regions', function(data){
      let regions = [];
      $.each(data, function(i,region) {
          regions.push(region.nom);
      })
      regions.sort();
      $.each(regions, function (i, region) {
          let option = new Option(region, region, false, false);
          $('.franceRegions').append(option).trigger('change');
      });
  });

  // FORM ON SUBMIT
    $('.filter-form form').on('submit', function(event) {
        event.preventDefault();
        $('.change-view').addClass('d-flex').show();
        $('#maps').hide();
        $('#section-datatable').show();
        $('#dataTable').show();
        $('#dataTable').DataTable({
            // searchPanes: {
            //     controls: false
            // },
            // dom:              'lftipr',   
            "searching":      false,
            "info":           false,         
            "scrollY":        "60vh",
            "scrollX":        true,
            "scrollCollapse": true,
            "paging":         false
        });
    });

    // CHANGE VIEW
    $('.datatable-container').show();
    $('.individual-info-container').removeClass('d-flex').hide();
    $('#view-table').on('click', function() {
        $(this).addClass('selected');
        $('#view-individual').removeClass('selected');
        $('.datatable-container').show();
        $('.individual-info-container').removeClass('d-flex').hide();
    })
    $('#view-individual').on('click', function() {
        $(this).addClass('selected');
        $('#view-table').removeClass('selected');
        $('.individual-info-container').addClass('d-flex').show();
        $('.datatable-container').hide();
    })
    // $('.carousel-info-prev, .carousel-info-next').on('click', function() {
    //     if () {
            
    //     } else if (){
            
    //     }
    // })
  });
