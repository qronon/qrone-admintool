
header("Content-Type: text/html; charset=utf8");

var t = load_template("main/qrone-frame.html");
t.select("#content").html($("#frame"));
$("#rightcolumn").html(load_template("main/sidebar.html"));
$("body").html(t);