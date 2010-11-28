
header("Content-Type: text/html; charset=utf8");

/*
var data = load_yaml("index.yaml");

document.set(data);
for( item in data ){
	if(data[item] instanceof String)
		document.set("#" + item, data[item].replace(/\n/g, "<br>") );
}
document.set("#point", function(doc,e){
	for(i in data.point){
		doc.set(".point", data.point[i]);
		doc.out(e);
	}
	document.set("#point", "test");
});
*/

var l = repository.list();
document.set("#repolist", function(doc,e){
	doc.set(".alert", "len:" + l.length);
	doc.out(e);
	/*
	if(l.length > 0){
		//for(i in data.point){
		//	var b = document.select(".repo");
		//	doc.out(b);
		//}
	}else{
		var b = document.select(".alert");
		doc.out(b);
	}
	*/
});

document.out();

