
header("Content-Type: text/html; charset=utf8");

var t = load_template("main/qrone-frame.html");
t.select("#content").html($("#frame"));
$("#rightcolumn").html(load_template("main/sidebar.html"));
$("body").html(t);

var l = repository.list();
if(l.length > 0){
	var repolist = $("#repolist");
	for(i in l){
		var repo = $(".repo").clone();
		$(".repo-title",repo).html(l[i].name);
		$(".repo-owner",repo).html(l[i].owner);
		
		var repourl = "http://github.com/api/v2/json/repos/show/" + l[i].owner + "/" + l[i].name;
		var repoinfo = http.get(repourl);
		repoinfo = JSON.decode(repoinfo);
		$(".repo-body",repo).html(repoinfo.repository.description);
		
		repolist.append(repo);
	}
	$(".alert").remove();
}else{
	$("#repolist").html($(".alert"));
}
