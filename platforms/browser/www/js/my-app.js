// Initialize app
var myApp = new Framework7({pushState    : true,
  swipeBackPage:false,
  swipePanel   :false,
  material     : true,});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {    
    if(localStorage.curp != undefined ) {
       myApp.closeModal();    
    } 

    $('#user_name').html(localStorage.name);
    $('#user_puesto').html(localStorage.puesto);
    $('#user_empresa').html(localStorage.empresa);
    $('#user_departamento').html(localStorage.departamento);
    $('#user_sucursal').html(localStorage.sucursal);
    $('#user_photo').attr('src',localStorage.photo);
    loadProfile();



    $("#desvincular").on('click',function (e) {
       localStorage.removeItem("curp");
       $('#CURP').val('');
       $('#list_empresa').html('');
       $('#consultar').show();
       $('#vincular').hide();
       myApp.loginScreen();
        
    })

    var options = { enableHighAccuracy: true};
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError,options);
    
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('index', function (page) {
   
         

}).trigger();

myApp.onPageInit('configuracion', function (page) {

    $('#utc').val(localStorage.timeZone);
    $('#utc_selected').html($("#utc option:selected").text());
    
    $('#utc').on('change',function(){
       localStorage.timeZone = $('#utc').val();
    });

    
    

});

myApp.onPageInit('login', function (page) {
    $('.navbar').css('background-color','rgba(18, 41, 75, 0)');

});

function loadProfile(){

        var today     = new Date();
        var dd        = String(today.getDate()).padStart(2, '0');
        var mm        = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy      = today.getFullYear();
        var day       = today.getDay();
        

        todayFormat         = dd + '-' + mm + '-' + yyyy;
        today               = yyyy + '-' + mm + '-' + dd;

        var mes  = ['Enero','Febrero','Marzo', 'Abril', 'Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo'];

        var $this = this;
        $$.ajax({
          url       :"http://dev.acdnomina.com.mx/apis/checador/v1/dataemploye",
          method    :"GET",
          dataType  :"json", 
          data      :{'Fecha'               : today,
                      'DiaSemana'           : day,
                      'idemploye'           : localStorage.idemploye,
                      'idPlantilla'         : localStorage.idemploye,
                      'CredencialVersion'   : 1,
                    },
          success   : function(response){
             if(response.Descanso == false){
              
              var entrada = response.Entrada.substring(0,5);
              var salida  = response.Salida.substring(0,5);

              $('#horario_entrada').html(entrada);
              $('#horario_salida').html(salida);
              $('#date_entrada').html(todayFormat);
              $('#date_salida').html(todayFormat);
              $('#HORARIO_DES').html('Horario del '+ dias[day-1] +' '+ dd+' de ' + mes[parseInt(mm)+1] + ' de '+ yyyy );
              $('#REGISTROS_DES').html('Registros del '+ dias[day-1] +' '+ dd+' de ' + mes[parseInt(mm)+1] + ' de '+ yyyy );
              var html ="";
              $.each(response.Registros,function(index,value){

                html+= "<tr>";
                html+= " <td class=\"label-cell center-table\"  > "+ todayFormat +" </td>";
                html+= " <td class=\"numeric-cell center-table\" > "+ value + "</td>";
                html+= "</tr>"

              });

              $('#regi_body').html(html);


              


             }else{

             }
          },
          error     :function(xhr,status){

          }
        });

}


function onSuccess(position) {
    //var element  = document.getElementById('geolocation');
    localStorage.latitude  = position.coords.latitude ;
    localStorage.longitude = position.coords.longitude;
  
}

    // onError Callback receives a PositionError object
    //
function onError(error) {
  
}

