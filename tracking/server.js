var http = require("http");
var url = require('url');
var express=require("express");
var app=express();
var redis = require('redis');
var client = redis.createClient("6379", "18.221.204.219");
client.on('connect', function() {
    console.log('connected');
});
var MongoClient = require('mongodb').MongoClient
			, assert = require('assert');

var murl = "mongodb://18.216.121.230/hackathon";




app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
app.get('/mosthits', function (request, response, next) {
			
			MongoClient.connect(murl, function(err, db) {  //get famous item for home page
  			assert.equal(null, err);
  			db.collection("link").find().sort({"count":-1}).limit(3).toArray(function(err, result) {
    		if (err) throw err;
    		response.json(result);
    		db.close();
    		response.end();
			});
			
		});
			
});
setInterval(cashupdate, 7000);

function cashupdate(){

	MongoClient.connect(murl, function(err, db) {  //get famous item for home page
  			assert.equal(null, err);
  			db.collection("link").find().sort({"count":-1}).limit(3).toArray(function(err, result) {
    		if (err) throw err;
    		console.log(result);
    		for(i=0;i<3;i++){
    		client.setex([ result[i].id,5,result[i].originalURL]);
    	}
    		db.close();
			});
			
		});

}


app.listen(3000)
