
function smt(o){
	$("button[type='btn']").hide();
	$("button[type='btnd']").show();
	$.ajax(
		{type:"POST",url:"submitdb.html",data:o,
		 processData:false,contentType:false,dataType:'json',
		 success:function(data,statusx)
		 {
			 if(data['status']!==0)
			 {
				 alert(data['response']);
				 $("button[type='btn']").show();
				 $("button[type='btnd']").hide();
			 }
			 else
			 {
				 $("#SA2").hide();
				 $("#mid").val(data['response']);
				 $("#pres").show();
			 }
		 },
		 error:function(xhr, statusx, et)
		 {
			 alert("ERROR: Connect lost.");
			 $("button[type='btn']").show();
			 $("button[type='btnd']").hide();
		 }
		});
return true;
}