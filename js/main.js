// LOADER 
$( window ).on('load', function() {
    $('.se-pre-con').fadeOut('slow');
});


jQuery(document).ready(function () {
    generateArgentineMap();
    // MAPA ARGENTINA

    function generateArgentineMap(){
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
                    cursor: 'pointer'
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
                $('#provinceInfoButton').removeClass('d-none').attr({'href': map.getRegionName(code), 'map': 'argentine'});
            },
        });
    }

    // MAPA FRANCIA

    function generateFranceMap(){
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
                $('#provinceInfoButton').removeClass('d-none').attr({'href': map.getRegionName(code), 'map': 'france'});
            },
        });
    }

    // SELECTS FORMULARIOS
    $('.argentineInstitutions').select2({
        placeholder: 'Institución argentina',
        allowClear: true,
        width: '100%',
    });
    let argentineProvinces = $('.argentineProvinces').select2({
        tags: true,
        placeholder: 'Provincia argentina',
        allowClear: true,
        width: '100%',
    });
    $('.franceInstitutions').select2({
        placeholder: 'Institución francesa',
        allowClear: true,
        width: '100%',
    });
    let franceRegions = $('.franceRegions').select2({
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
    $('.study_level').select2({
        placeholder: 'Nivel de Estudio',
        allowClear: true,
        width: '100%',
    });
    $('.beneficiary').select2({
        placeholder: 'Beneficiario',
        allowClear: true,
        width: '100%',
    });

    $('.movilityType, .branch, .discipline, .program, .study_level, .beneficiary, .argentineInstitutions, .argentineProvinces, .franceInstitutions, .franceRegions').on('select2:select', function (e) {
        $('label[for="'+$(this).attr('name')+'"]').removeClass('d-none');
    });
    $('.movilityType, .branch, .discipline, .program, .study_level, .beneficiary, .argentineInstitutions, .argentineProvinces, .franceInstitutions, .franceRegions').on('select2:unselect', function (e) {
        $('label[for="'+$(this).attr('name')+'"]').addClass('d-none');
    });

    // CAMBIO DE MAPA

    function clearRegions(selector){
        let map=$(selector).vectorMap('get', 'mapObject');
        map.clearSelectedRegions(); 
        $('#provinceInfoButton').addClass('d-none');
    }
    $('#argentineMap').show();
    $('#franceMap').hide();
    $('#dataTable').hide();
    $('.change-view').removeClass('d-flex').hide();
    $('#argentineFlag').on('click', function(e) {
        if($(this).hasClass('selected')){
            e.preventDefault()
        } else{
            $('#franceMap').hide();
            $('#franceMap').html('');
            $('#provinceInfo').html('');
            $('#argentineMap').show();
            generateArgentineMap();
            $(this).addClass('selected');
            $('#franceFlag').removeClass('selected');
            clearRegions('#franceMap');
        }
    })
   $('#franceFlag').on('click', function(e) {
       if($(this).hasClass('selected')){
           e.preventDefault()
       } else{
           $('#argentineMap').hide();
           $('#provinceInfo').html('');
           $('#argentineMap').html('');
           $('#franceMap').show();
           generateFranceMap();
           $(this).addClass('selected');
           $('#argentineFlag').removeClass('selected');
           clearRegions('#argentineMap');
       }
    })
   $('.carousel-map-next, .carousel-map-prev').on('click', function() {
       if ($('#franceMap').css('display') == 'none' && !$('#franceFlag').hasClass('selected')) {
           $('#provinceInfo').html('');
           clearRegions('#argentineMap');
            $('#argentineMap').hide().html('');
            $('#franceMap').show();
            generateFranceMap();
            $('#franceFlag').addClass('selected');
            $('#argentineFlag').removeClass('selected');
       } else if ($('#argentineMap').css('display') == 'none' && !$('#argentineFlag').hasClass('selected')) {
            $('#provinceInfo').html('');
            clearRegions('#franceMap');
            $('#franceMap').hide().html('');
            $('#argentineMap').show();
            generateArgentineMap();
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

  $('#provinceInfoButton').on('click', function(event){
    event.preventDefault();
    if ($(this).attr('map') == 'argentine') {
        argentineProvinces.val($(this).attr('href')).trigger('change'); // Cambiar esto de acuerdo a cómo está seteado en la base de datos del campusfrance para que sea más estable
    } else {
        franceRegions.val($(this).attr('href')).trigger('change'); // Cambiar esto de acuerdo a cómo está seteado en la base de datos del campusfrance para que sea más estable
    }
    showDatatables()
  })
  // FORM ON SUBMIT
    $('.filter-form form').on('submit', function(event) {
        event.preventDefault();
        showDatatables()
    });
    function showDatatables(){
        $('.change-view').addClass('d-flex').show();
        $('#maps').hide();
        $('#section-datatable').show();
        $('#dataTable').show();
        // Do Something
        let table = $('#dataTable').DataTable({
            "searching":      false,
            "info":           false,         
            "scrollY":        "80vh",
            "scrollX":        true,
            "scrollCollapse": true,
            "paging":         false
        });
        $('.results-quantity-number').html('1/'+table.rows().count())
    }

    // CHANGE VIEW
    $('.datatable-container').show();
    $('.individual-info-container').hide();
    $('.results-quantity').hide()
    $('#view-table').on('click', function() {
        $(this).addClass('selected');
        $('#view-individual').removeClass('selected');
        $('.datatable-container').show();
        $('.individual-info-container').hide();
        $('.results-quantity').hide()
    })
    $('#view-individual').on('click', function() {
        $(this).addClass('selected');
        $('#view-table').removeClass('selected');
        $('.individual-info-container').show();
        $('.datatable-container').hide();
        $('.results-quantity').show()
    })

    let carouselInfo = $("#infoMapCarousel").owlCarousel({
        items: 1,
        loop: true,
        center: true,
        autoplay: false,
        autoWidth: false,
        nav: true,
        dots: false,
        smartSpeed :450,
        navText: ["<img src='./img/flecha-izq-gris.png' alt='ver anterior'>","<img src='./img/flecha-der-gris.png' alt='ver siguiente'>"],
    });

    carouselInfo.on('changed.owl.carousel', function(event) {
        // Do something como aumentar el contador (usar event.item)
    })
  });