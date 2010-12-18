
$("#message").html(exception.message);
$("#file").html(exception.file);
$("#line").html(parseInt(exception.line));
if(exception.stacktrace){
	$("#stacktrace").html(exception.stacktrace.replace(/\n/g,"<br/>"));
}
$("#source").html(exception.source).attr("class",
		"brush: js; highlight: [" + parseInt(exception.line) + "]");

$("#scope").html(exception.scope);