let foremnode = require('../index.js');
// Public API

let client = new foremnode();

let q = "commercial",
 	location="BE-WLG",
 	page=1,
 	resultat=2;

client.search(resultat,page,q,location,function (error, data,count,page,resultat) {
	if(error) console.log("E!",error)
	console.dir(data);

});

// client.stream(q,location,function (data,count,timestamp) {
// 	console.dir(data);
// });