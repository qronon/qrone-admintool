
header("Content-Type: text/html; charset=utf8");

var data = load_yaml("index.yaml");

document.set(data);
/*
for( item in data ){
	if(data[item] instanceof String)
		document.set("#" + item, data[item].replace(/\n/g, "<br>") );
}
*/
document.set("#point", function(doc,e){
	for(i in data.point){
		doc.set(".point", data.point[i]);
		doc.out(e);
	}
	document.set("#point", "test");
});

document.out();

