"use strict";
$(document).ready(function(){
    $("#a0").on("click",function(){$("tr[data-adv='A']").toggle(300);});
    $("#a1").on("click",function(){$("tr[data-adv='B']").toggle(300);});
    $('[data-toggle="tooltip"]').tooltip();
    $("button[type='btn']").on("click",function(){if($("#SA2")[0].checkValidity()){smt(jobChk());};
    $("#SA2").addClass('was-validated');});
    $("#SA2")[0].addEventListener("submit",function(event){event.preventDefault();
    event.stopPropagation();},false);
    $("#cp").on("click",function(){$("#mid").select();
    var su=document.execCommand('copy');
    if(su){$("#cp")[0].innerText("OK");}else{alert("The browser doesn't support this auto function.");
}});});

    
function jobChk(){
    var form=new FormData();
    form.append('d0',$("input[name='s0']:checked").val());
    form.append('d1',$("#i2").val());
    form.append('d2',$("#i3").val());
    form.append('d3',$("#i4").val());
    form.append('d4',$("#i5").val());
    form.append('d5',$("#i6").val());
    form.append('d6',$("input[name='s1']:checked").val());
    form.append('d7',$("#i9").val());
    form.append('d8',$("input[name='s2']:checked").val());
    form.append('d9',$("#i14").val());
    form.append('d10',$("input[name='s3']:checked").val());
    form.append('d11',$("input[name='s4']:checked").val());
    form.append('d12',$("#i19").val());
    form.append('d13',$("#i20").val());
    form.append('d14',$("#i21").val());
    form.append('d15',$("#i22").val());
    form.append('d16',$("#i23").val());
    form.append('d17',$("#i24").val());
    form.append('d18',$("#i25").val());
    form.append('d19',$("#i26").val());
    form.append('d20',$("#i27").val());
    form.append('d21',$("#i28").val());
    form.append('d22',$("#i29").val());
    form.append('d23',$("#i30").val());
    form.append('d24',$("#i31").val());
    form.append('d25',$("#i32").val());
    return form;}
function smt(o){
$("button[type='btn']").hide();
$("button[type='btnd']").show();
$.ajax({type:"POST",
        url:"submitdb.html",
        data:o,
        processData:false,
        contentType:false,
        dataType:'json',
        success:function(data,statusx){
            if(data['status']!==0){alert(data['response']);
            $("button[type='btn']").show();$("button[type='btnd']").hide();
        }
            else{$("#SA2").hide();
            $("#mid").val(data['response']);
            $("#pres").show();
        }
        },
        error:function(xhr, statusx, et){
            alert("ERROR: Connect lost.");
            $("button[type='btn']").show();
            $("button[type='btnd']").hide();
        }
    }
    );
    return true;}