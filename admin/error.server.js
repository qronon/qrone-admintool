
document.set("#file", exception.file);
document.set("#line", parseInt(exception.line));
document.set("#stacktrace", exception.stacktrace);
document.set("#source", exception.source, true);

var pre = document.select("#source");
pre.attr("class","brush: js; highlight: [" + parseInt(exception.line) + "]");
document.out();