
document.set("#file", exception.file);
document.set("#line", exception.line);
document.set("#stacktrace", exception.stacktrace);
document.set("#source", exception.source, true);

var pre = document.select("#source");
pre.attr("class","brush: js; highlight: [" + exception.line + "]");
document.out();