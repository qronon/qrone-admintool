
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


document.set("#repolist", function(doc,e){
	
	if(l.length > 0){
		for(i in l){
			doc.set(i);
			doc.out($(".repo"));
		}
	}else{
		doc.out($(".alert"));
	}
	
});
*/

var l = repository.list();

$("#repolist").html(function(doc,e){
	
	if(l.length > 0){
		for(i in l){
			doc.set(i);
			doc.out($(".repo"));
		}
	}else{
		doc.out($(".alert"));
	}
	
});

document.out();

