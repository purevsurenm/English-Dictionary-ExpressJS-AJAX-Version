var search = function(){
	$("#word").autocomplete("close");
	$.ajax({
		url: "/server",
		type: "POST",
		data: "word="+$("#word").val(),
		dataType: "JSON",
		success: function(data){
			var html = "";
			for(var element in data){
				html += "<p><span>"+data[element].wordtype+" </span>"+data[element].definition+"</p>"
			}
			$("#result").html(html);
		}
	});
};

var suggestMe = function(request, response){
	$.ajax({
		url: "/server",
		type: "POST",
		dataType: "JSON",
		data: "typed="+request.term,
		success: function(data){
			var resp = [];
			for(var element in data){
				resp.push({"label": data[element]._id});
			}
			response(resp);
		}
	});
}

$(document).ready(function(){
	
	$("#search").click(search);
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        search();
	    }
	});
	
	$("#word").autocomplete({
		source: suggestMe,
		select: search
	});

});