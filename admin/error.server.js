

var stacktrace = "";
var array = exception.getStackTrace();
for(var trace in array){
	stacktrace += trace.toString() + "</br>";
}

document.set("#stacktrace", stacktrace);
document.out();