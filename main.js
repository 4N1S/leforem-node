var foremnode = require('../index.js');
// Public API

let client = new foremnode();
let q = "developpeur",
	location="liege",
	page=1,
	resultat=1;

client.search(resultat,page,q,location,function (error, data,count,page,resultat) {
	if(error) console.log("E!",error)
	console.dir(data);
});

let q="developpeur",
	location="BE-WLG";
client.stream(q,location,function (data,count,timestamp) {
	console.dir(data);
});