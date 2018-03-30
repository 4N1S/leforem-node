const _ = require('underscore'),
	  https = require('https'),
	  crypto = require('crypto'),
	  url = require('url'),
	  urlencode = require('urlencode');

const forem = function(key,secret,verbose) {
	this.verbose = verbose || false;
	this.version = "0.0.3";
	this.key = key;
	this.secret = secret;
	this.host = "www.leforem.be";
	this.uri = "/recherche-offres-emploi/rest/searchJob/";
	this.baseURL = "https://www.leforem.be/";
	this.userAgent = "forem-node";
	this.request_options = {
		method: 'GET',
		headers: {
			"User-Agent": this.userAgent,
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}
};


forem.prototype.search = function(resultat,page,q,location,callback) {
    console.log(this.uri +"fromQuickSearch?query="+q+"&lieu_trav="+location+"&start="+page+"&pageSize="+resultat);
	this.pubRequest("fromQuickSearch?query="+q+"&lieu_trav="+location+"&start="+page+"&pageSize="+resultat, {}, function(err, data) {
		return callback(err, data.offers,data.count,data.page,data.pageSize);
	});
}
forem.prototype.stream = function(q,location,callback) {
	const duration=5000;
    const timestamp=Date.now();
    console.log("S! Stream Initialization");
    console.log(this.uri +"fromQuickSearch?updateTimeStamp="+timestamp+"&pageSize=10&location="+location+"&query="+q);
    this.pubRequest("fromQuickSearch?updateTimeStamp="+timestamp+"&pageSize=10&location="+location+"&query="+q, {}, function(err, data) {
    	return callback(data.offers,data.count,timestamp);
    });
	setInterval(()=>{
		let timestamp=Date.now();
	    this.pubRequest("fromQuickSearch?updateTimeStamp="+timestamp+"&pageSize=10&location="+location+"&query="+q, {}, function(err, data) {

			return callback(data.offers,data.count,timestamp);
		});
	
	}, duration);

}
forem.prototype.pubRequest = function(method, params, callback) {
	const options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: this.request_options.method,
	  verbose: this.verbose,
	  headers: this.request_options.headers,

	};
	cb = function(response) {
		if (response.statusCode < 200 || response.statusCode > 299) {
		   callback(response.statusCode);
		 }
		if(response.statusCode==200){
		let str = '';
		response.on('data', function (chunk) {
			str += chunk;
			if (options.verbose) console.log(str);
		});


		response.on('end', function () {
			let objFromJSON;
			try {
				objFromJSON = JSON.parse(str);
				return callback(null, objFromJSON);
			}
			catch (err) {
				return callback(err, null);
			}
		});
		}
	}
	let req = https.request(options, cb);
	req.on('error', function(err) {
		callback(err.status, null);
	});

	req.end();

};

module.exports = forem;
