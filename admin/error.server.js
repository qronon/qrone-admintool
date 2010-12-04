
document.set("#file", exception.file);
document.set("#line", exception.line);
document.set("#stacktrace", exception.stacktrace);
document.set("#source", exception.source, true);
document.out();