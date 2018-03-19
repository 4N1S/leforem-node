var foremnode = require('../index.js');
// Public API

var client = new foremnode();
var q = "developpeur";
var location="liege";
var page=1;
var resultat=1;

client.search(resultat,page,q,location,function (error, data,count,page,resultat) {
	if(error) console.log("E!",error)
	console.dir(data);
});

var q="developpeur";
var location="BE-WLG";
client.stream(q,location,function (data,count,timestamp) {
	console.dir(data);
});