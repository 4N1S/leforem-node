
var _ = require('underscore');
var https = require('https');
var crypto = require('crypto');
var url = require('url');
var urlencode = require('urlencode');

var forem = function(key,secret,verbose) {
	this.verbose = verbose || false;
	this.version = "0.0.1";
	this.key = key;
	this.secret = secret;
	this.host = "www.leforem.be";
	this.uri = "/recherche-offres-emploi/rest/searchJob/";
	this.baseURL = "https://www.leforem.be/";
	this.userAgent = "forem-node";
	this.request_options = {
		method: 'GET',
		headers: {
			"User-Agent": "forem-node",
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
	var duration=30000;
    var self = this; // this creates a closure
    var location=location;
    var q=q;
    var timestamp=Date.now();
    console.log("S! Stream Initialization");
    console.log(this.uri +"fromQuickSearch?updateTimeStamp="+timestamp+"&pageSize=10&location="+location+"&query="+q);
    self.pubRequest("fromQuickSearch?updateTimeStamp="+timestamp+"&pageSize=10&location="+location+"&query="+q, {}, function(err, data) {
    	return callback(data.offers,data.count,timestamp);
    });
	setInterval(function(){
		var timestamp=Date.now();
	    self.pubRequest("fromQuickSearch?updateTimeStamp="+timestamp+"&pageSize=10&location="+location+"&query="+q, {}, function(err, data) {

			return callback(data.offers,data.count,timestamp);
		});
	
	}, duration);

}
forem.prototype.pubRequest = function(method, params, callback) {
	var options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: 'GET',
	  verbose: this.verbose
	};
	cb = function(response,reject) {
		if (response.statusCode < 200 || response.statusCode > 299) {
		   callback(response.statusCode);
		 }
		if(response.statusCode==200){
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
			if (options.verbose) console.log(str);
		});


		response.on('end', function () {
			var objFromJSON;
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
	var req = https.request(options, cb);
	req.on('error', function(err) {
		callback(err.status, null);
	});

	req.end();

};

module.exports = forem;
