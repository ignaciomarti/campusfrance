// LOADER 
$( window ).on('load', function() {
    $('.se-pre-con').fadeOut('slow');
});


jQuery(document).ready(function () {
    // MAPA ARGENTINA

    jQuery('#argentineMap').vectorMap({
        map: 'ar_merc',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionsSelectable: true,
        regionsSelectableOne: true,
        zoomButtons: false,
        regionStyle: {
            initial: {
                fill: "#1c92d0",
            },
            hover: {
                fill: '#e10811',
                // cursor: 'pointer'
            },
            selected:{
                fill: '#e10811'
            }
        },
        regions: [{
            scale: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial',
            values: 'gdpData'
        }],
        onRegionClick: function (a, code) {
            let map=$('#argentineMap').vectorMap('get', 'mapObject');
            $('#provinceInfo').html(map.getRegionName(code)+' (40)');
        },
    });

    // MAPA FRANCIA

    jQuery('#franceMap').vectorMap({
        map: 'fr_regions_2016_merc',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionsSelectable: true,
        regionsSelectableOne: true,
        zoomButtons: false,
        regionStyle: {
            initial: {
                fill: "#1c92d0",
            },
            hover: {
                fill: '#e10811',
                cursor: 'pointer'
            },
            selected:{
                fill: '#e10811'
            }
        },
        onRegionClick: function (a, code) {
            let map=$('#franceMap').vectorMap('get', 'mapObject');
            $('#provinceInfo').html(map.getRegionName(code)+' (40)');
        },
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

    function clearRegions(selector){
        let map=$(selector).vectorMap('get', 'mapObject');
        map.clearSelectedRegions(); 
    }
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
        clearRegions('#franceMap');
    })
   $('#franceFlag').on('click', function() {
        $('#argentineMap').hide();
        $('#provinceInfo').html('');
        $('#franceMap').show();
        $(this).addClass('selected');
        $('#argentineFlag').removeClass('selected');
        clearRegions('#argentineMap');
    })
   $('.carousel-map-next, .carousel-map-prev').on('click', function() {
       if ($('#franceMap').css('display') == 'none') {
           $('#provinceInfo').html('');
           clearRegions('#argentineMap');
            $('#argentineMap').hide();
            $('#franceMap').show();
            $('#franceFlag').addClass('selected');
            $('#argentineFlag').removeClass('selected');
       } else if ($('#argentineMap').css('display') == 'none') {
            $('#provinceInfo').html('');
            clearRegions('#franceMap');
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
        // Do Something
        let table = $('#dataTable').DataTable({
            "searching":      false,
            "info":           false,         
            "scrollY":        "60vh",
            "scrollX":        true,
            "scrollCollapse": true,
            "paging":         false
        });
        $('.results-quantity-number').html('1/'+table.rows().count())
    });

    // CHANGE VIEW
    $('.datatable-container').show();
    $('.individual-info-container').removeClass('d-flex').hide();
    $('.results-quantity').hide()
    $('#view-table').on('click', function() {
        $(this).addClass('selected');
        $('#view-individual').removeClass('selected');
        $('.datatable-container').show();
        $('.individual-info-container').removeClass('d-flex').hide();
        $('.results-quantity').hide()
    })
    $('#view-individual').on('click', function() {
        $(this).addClass('selected');
        $('#view-table').removeClass('selected');
        $('.individual-info-container').addClass('d-flex').show();
        $('.datatable-container').hide();
        $('.results-quantity').show()
    })
    $('.carousel-info-prev').on('click', function() {
        // Do Something
    })
  });
