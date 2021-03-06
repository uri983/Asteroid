var jCheck = function(){
  return {

      openScan:function(){
        $this = this;
        cordova.plugins.barcodeScanner.scan(
              function (result) {
                  var d = new Date($.now());
                  var time = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

                 //console.log(result.cancelled);
                  if (result.cancelled == false){
                   
                    $this.sendData(result.text);

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

      },
      sendData:function(code){
        SpinnerPlugin.activityStart("Registrando....");
        var $this = this;
        $$.ajax({
          url       :"https://app.acdnomina.com.mx/apis/checador/v1/checkin",
          method    :"POST",
          dataType  :"json", 
          data      :{'method'          : 'A',
                      'token'           : code,
                      'idemploye'       : localStorage.idemploye,
                      'device'          : device.uuid,
                      'UTC'             : localStorage.timeZone,
                      'device_latitude' : localStorage.latitude,
                      'device_longitude': localStorage.longitude,
                    },
          success   : function(response){
            SpinnerPlugin.activityStop();
            if(response.success == true){
              navigator.notification.beep(1);
              myApp.alert('Correcto','Registro guardado con exito');
              loadProfile();
            }else{ 
              navigator.vibrate(1000);
              myApp.alert(response.errors.message,'Error en el registro');

            }

          },
          error     :function(xhr,status){

          }
        });

      },
  }  
}();