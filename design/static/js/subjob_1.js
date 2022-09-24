
$(function () {

    $("#sub").on("click",function(){
        if(
    $("#SA2")[0].checkValidity() 
    )
    {
        sck();
    };
}
        );
    $("#cp").click(function(){
        $("#mid").select();
        var su=document.execCommand('copy');
        if(su){
            $("#cp")[0].innerText("OK");
        }
        else{alert("The browser doesn't support this auto function.");
        }});
    $("#a0").click(function(){
        var a = $("#advo").css("visibility");
        if(a == "visible"){
            $("#advo").css("visibility","hidden");
        }else{
            $("#advo").css("visibility","visible");
        }
    }   
    );

    $("#qopt").on('switch-change', function (){
        var a = $("#i9").val();
        if(a == 1){
            $("#i9").val(0);
        }else{
            $("#i9").val(1);
        }
    }   
    );

    $("#sopt").on('switch-change', function (){
        var a = $("#i10").val();
        if(a == 1){
            $("#i10").val(0);
        }else{
            $("#i10").val(1);
        }
    }   
    );




    $("#optpro").click(function(){
        $('#i8').val('');
        $("#smistr").css("visibility","hidden");
        var a = $("#smipro").css("visibility");
        if(a == "visible"){
            $("#smipro").css("visibility","hidden");
        }else{
            $("#smipro").css("visibility","visible");
        }
    }   
    );

    $("#optsmi").click(function(){
        $('#i4').val('250');
        $('#i5').val('750');
        $('#i6').val('-2');
        $('#i7').val('8');
        $("#smipro").css("visibility","hidden");
        var a = $("#smistr").css("visibility");
        if(a == "visible"){
            $("#smistr").css("visibility","hidden");
        }else{
            $("#smistr").css("visibility","visible");
        }
    }   
    );



    $("#a0").click(function(){
        $('#i4').val('250');
        $('#i5').val('750');
        $('#i6').val('-2');
        $('#i7').val('8');
        $('#i8').val('');
        $("#smipro").css("visibility","hidden");
        $("#smistr").css("visibility","hidden");
   
    }   
    );
    $("#optpha").click(function(){
        $('#i4').val('250');
        $('#i5').val('750');
        $('#i6').val('-2');
        $('#i7').val('8');
        $('#i8').val('');
        $("#smipro").css("visibility","hidden");
        $("#smistr").css("visibility","hidden");
    }   
    );

    $("#optbo").click(function(){
        $('#i4').val('250');
        $('#i5').val('750');
        $('#i6').val('-2');
        $('#i7').val('8');
        $('#i8').val('');
        $("#smipro").css("visibility","hidden");
        $("#smistr").css("visibility","hidden");
    }   
    );


 });






function sck() {
    event.preventDefault();
    $.ajax({
       url: "/relation/auth/",
       type: 'post',            
       contentype:'application/json',
       headers:{'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
       data:JSON.stringify({
           target_name: $('#i1').val(),
           numbers: $('#i2').val(),
           job_name: $('#i3').val(),
           mw_1: $('#i4').val(),
           mw_2: $('#i5').val(),
           logp_1: $('#i6').val(),
           logp_2: $('#i7').val(),
           smi: $('#i8').val(),
           qed: $('#i9').val(),
           sa: $('#i10').val(),
           ema:  $('#emai').val(),
           optswitch: $('#a0').val(),
           optmethod: $('input:radio:checked').val(),
           
       }),


       success: function(data)
       {
           if(data['status']=='ER'){
               //alert(data['response']);
               $("button[type='btn']").show();
               $("button[type='btnd']").hide();
               $("#SA2").hide();
               $("#pres1").show();
               $("#mid1").val(data['response']);
       }
           else{
               $("button[type='btn']").show();
               $("button[type='btnd']").hide();
               $("#SA2").hide();
               $("#mid").val(data['response']);
               $("#pres").show();
           }
           } 
       
           
    
    
    });
}



