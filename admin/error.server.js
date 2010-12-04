

var stacktrace = "";
var array = exception.getStackTrace();
for(var trace in array){
	stacktrace += trace.toString();
}

document.set("#stacktrace", stacktrace);