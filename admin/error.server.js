

var stacktrace = "";
var array = exception.getStackTrace();
for(var i in array){
	stacktrace += array[i] + "</br>";
}

document.set("#stacktrace", stacktrace);
document.out();