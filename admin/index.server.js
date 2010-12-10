
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
		for(j in l[i]){
			
			$(".repo-title",repo).html(l[i].repo);
			$(".repo-owner",repo).html(l[i].user);
			$(".repo-body",repo).html("test:"+query["test"]);
			
		}
		
		repolist.append(repo);
	}
}else{
	$("#repolist").html($(".alert"));
}


