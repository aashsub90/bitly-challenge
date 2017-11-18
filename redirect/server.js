var http = require("http");
var url = require('url');
var express=require("express");
var app=express();
const request = require('superagent');
const redis = require('redis');
const redisCon = redis.createClient(6379, 'redisDB');

var MongoClient = require('mongodb').MongoClient
			, assert = require('assert');
//var murl = "mongodb://18.216.104.16/hackathon";
var murl = "mongodb://172.17.0.2:27017/hackathon";

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});


function getURL(request, response, next){
	var hash=request.params.hash;
	console.log(hash);

	MongoClient.connect(murl, function(err, db) {  //get famous item for home page
		assert.equal(null, err);
		//db.collection("link").find({id:hash},{originalURL:1,_id:0}).toArray(function(err, result) {
		db.collection("link").find({id:request.params.hash},{originalURL:1,_id:0}).toArray(function(err, result) {
		if (err) throw err;
		//console.log(hash,result[0]);
		//db.collection("link").find({id:hash},{count:1,_id:0}).toArray(function(err, resu) {
		db.collection("link").find({id:request.params.hash},{count:1,_id:0}).toArray(function(err, resu) {
		if (err) throw err;
		var count=resu[0].count+1;
		//db.collection("link").update({id:hash},{$set:{'count':count}},function(err,resul) {
		db.collection("link").update({id:request.params.hash},{$set:{'count':count}},function(err,resul) {
			if (err) throw err;
		response.redirect(result[0].originalURL);
		db.close();
		response.end();
		});
		});
	});

});
	//logic to get URL and increment count by 1
}


app.get('/:hash', cache, getURL);

function cache(request, response, next){
  var hash=request.params.hash;
  redisCon.get(hash, function(err,data){
    if(err) throw err;

    if(data !=null){
      response.redirect(data);
    }else{
      next();
    }
  });
}

			//http://localhost:5000/HyNN_62yG
			//http://localhost:5000/SyKdOOjJG
			//logic to get URL and increment count by 1


app.listen(5000);

console.log('Redirection server started on: 5000' );
