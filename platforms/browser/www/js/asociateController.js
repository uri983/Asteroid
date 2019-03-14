var jAsociate = function(){
  return {
      Init:function(){

      },
      getInfoAsociate:function(){
        SpinnerPlugin.activityStart("Consultando datos....");
        var $this = this;
        $$.ajax({
          url       :"https://app.acdnomina.com.mx/apis/checador/v1/asociate",
          method    :"POST",
          dataType  :"json",
          data      :{'curp':$('#CURP').val()},
          success   : function(response){
            SpinnerPlugin.activityStop();
            if(response.counts == 0){
              myApp.alert('Tu curp no esta vinculada a un puesto, para más información contacta a recursos humanos de tu empresa.','Puestos no encontrados');
            }else{
              var html = "";
              $.each(response.data,function(index,value){

                  html+="<li>";
                  html+="<label class=\"label-radio item-content\">";
                  html+="<input type=\"radio\" name=\"empresa\" value=\""+value.idemploye+"\">";

                  html+="<div class=\"item-media\">";
                  html+="<i class=\"icon icon-form-radio\"></i>";
                  html+=" </div>";

                  html+="<div class=\"item-inner\">";
                  html+="<div class=\"item-title-row\">";
                  html+="<div class=\"item-text\">"+value.empresa+"</div>";
                  html+="<div class=\"item-subtitle\">"+value.puesto+"</div>";
                  html+="<div class=\"item-title\">"+value.name+" "+value.lastname+"</div>";
                  html+="</div>";

                  html+="</div>";
                  html+="</label>";
                  html+="</li>";

                  html+="<input type=\"hidden\" id=\""+value.idemploye+"_nombre\" value=\""+value.name+" "+value.lastname+"\">";
                  html+="<input type=\"hidden\" id=\""+value.idemploye+"_puesto\" value=\""+value.puesto+"\">";
                  html+="<input type=\"hidden\" id=\""+value.idemploye+"_empresa\" value=\""+value.empresa+"\">";
                  html+="<input type=\"hidden\" id=\""+value.idemploye+"_departamento\" value=\""+value.departamento+"\">";
                  html+="<input type=\"hidden\" id=\""+value.idemploye+"_sucursal\" value=\""+value.sucursal+"\">";
                  html+="<input type=\"hidden\" id=\""+value.idemploye+"_photo\" value=\""+value.photo+"\">";



              });

              $('#list_empresa').html(html);
              $('#consultar').hide();
              $('#vincular').show();
 
            }

          },
          error     :function(xhr,status){

          }
        });

      },
      asociate:function(){
        SpinnerPlugin.activityStart("Vinculando....");
        localStorage.asociate     = 1;
        localStorage.curp         = $('#curp').val();
        localStorage.idemploye    = $('input[name=empresa]:checked').val();
        localStorage.name         = $('#'+localStorage.idemploye+'_nombre').val();
        localStorage.puesto       = $('#'+localStorage.idemploye+'_puesto').val();
        localStorage.empresa      = $('#'+localStorage.idemploye+'_empresa').val();
        localStorage.sucursal     = $('#'+localStorage.idemploye+'_sucursal').val();
        localStorage.departamento = $('#'+localStorage.idemploye+'_departamento').val();
        localStorage.photo        = $('#'+localStorage.idemploye+'_photo').val();

        var hrs = -(new Date().getTimezoneOffset() / 60);
        if(hrs == "-5"){
          hrs=1;
        }else if(hrs == "-6"){
          hrs=2;
        }
        else if(hrs == "-7"){
          hrs=3;
        }else if(hrs == "-8"){
          hrs=4;
        }
        localStorage.timeZone       = hrs;
        $('#user_name').html(localStorage.name);
        $('#user_puesto').html(localStorage.puesto);
        $('#user_empresa').html(localStorage.empresa);
        $('#user_departamento').html(localStorage.departamento);
        $('#user_sucursal').html(localStorage.sucursal);
        $('#user_photo').attr('src',localStorage.photo);

        myApp.closeModal();
        SpinnerPlugin.activityStop();

      },
      closeAsociate:function(){

      },
  }  
}();