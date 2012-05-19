
$("#code").html(request.get["code"]);

var post = escape(
		{ 
			"client_id" : "21a369762644ac3c15b0",
			"client_secret" : "bf18e9b4c5b601f6652240e8a7391d793ca51530",
			"code" : request.get["code"]
		}
		);
$("#post").html(post);

var result = http.post("https://github.com/login/oauth/access_token",post);
$("#result").html(result);


var resultObj = parse_query(result);

$("#access_token").html(resultObj.access_token);

var user = http.get("https://api.github.com/user?access_token=" + resultObj.access_token[0]);

var userobj = JSON.decode(uesr);




