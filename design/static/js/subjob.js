
$(function () {

    $('#sub').click(function () {
         event.preventDefault();
         $.ajax({
            url: "/auth/",
            type: 'post',            

            'Content-Type':'application/json',
            headers:{'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
            data:JSON.stringify({
                target_name: $('#i1').val(),
                numbers: $('#i2').val(),
                job_name: $('#i3').val(),
                mw_1: $('#i4').val(),
                mw_2: $('#i5').val(),
                logp_1: $('#i6').val(),
                logp_2: $('#i7').val(),
                smi:$('#i8').val(),
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
    });
    $("#cp").click(function(){
        $("#mid").select();
        var su=document.execCommand('copy');
        if(su){
            $("#cp")[0].innerText("OK");
        }
        else{alert("The browser doesn't support this auto function.");
        }});
    $("#a0").click(function(){$("#advo").toggle();});
 });


