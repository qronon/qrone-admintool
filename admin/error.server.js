
$("#file").html(exception.file);
$("#line").html(parseInt(exception.line));
$("#stacktrace").html(exception.stacktrace.replace(/\n/g,"<br/>"));
$("#source").html(exception.source).attr("class",
		"brush: js; highlight: [" + parseInt(exception.line) + "]");

document.out();