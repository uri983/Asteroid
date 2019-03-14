// Initialize app
var myApp = new Framework7({swipeBackPage:false,swipePanel:false});


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

    
    
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('index', function (page) {
   
         

}).trigger();

myApp.onPageInit('login', function (page) {
    $('.navbar').css('background-color','rgba(18, 41, 75, 0)');

    

});

