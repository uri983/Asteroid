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

    $("#vincular").on('click',function (e) {
    localStorage.curp = $('#curp').val();
    myApp.closeModal(); 

    })

    $("#check").on('click',function (e) {
        cordova.plugins.barcodeScanner.scan(
              function (result) {
                  var d = new Date($.now());
                  var time = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

                  if(result != ""){

                   navigator.notification.alert(
                    'Registro completado', 
                    '',            
                    'Exito',     
                    'OK'     
                    ); 
                     
                  }
                            
              },
              function (error) {
                  alert("Scanning failed: " + error);
              },
              {
                  preferFrontCamera : false, // iOS and Android
                  showFlipCameraButton : true, // iOS and Android
                  showTorchButton : true, // iOS and Android
                  torchOn: false, // Android, launch with the torch switched on (if available)
                  saveHistory: true, // Android, save scan history (default false)
                  prompt : "Escanea el código QR", // Android
                  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                   // default: all but PDF_417 and RSS_EXPANDED
                   // Android only (portrait|landscape), default unset so it rotates with the device
                  disableAnimations : true, // iOS
                  disableSuccessBeep: false // iOS and Android
              }
       ); 
        
    })

    $("#desvincular").on('click',function (e) {
       localStorage.removeItem("curp");
       myApp.loginScreen();
        
    })

    
    
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('index', function (page) {
    

})

myApp.onPageInit('login', function (page) {
    $('.navbar').css('background-color','rgba(18, 41, 75, 0)');

    

})



// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    $$('body').css('height', 'auto');
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})