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



    $("#desvincular").on('click',function (e) {
       localStorage.removeItem("curp");
       myApp.loginScreen();
        
    })

    var options = { enableHighAccuracy: true , timeout: 2*1000, maximumAge: 0 };
    
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


function onSuccess(position) {
    var element  = document.getElementById('geolocation');
    var    datos = 'Latitude: '           + position.coords.latitude              + '<br />' +
                   'Longitude: '          + position.coords.longitude             + '<br />' +
                   'Altitude: '           + position.coords.altitude              + '<br />' +
                   'Accuracy: '           + position.coords.accuracy              + '<br />' +
                   'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                   'Heading: '            + position.coords.heading               + '<br />' +
                   'Speed: '              + position.coords.speed                 + '<br />' +
                  'Timestamp: '          + position.timestamp                    + '<br />';
   alert(datos);
}

    // onError Callback receives a PositionError object
    //
function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

