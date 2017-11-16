var http = require("http");
var url = require('url');
var express=require("express");
var app=express();

var MongoClient = require('mongodb').MongoClient
			, assert = require('assert');
var murl = "mongodb://18.216.104.16/hackathon";

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
app.get('/:hash', function (request, response, next) {
			var hash=request.params.hash;
			/*var id=0;
			var hash=request.params.hash;
			var a='a';
			var A='A';
			var z='0';
			//logic to conver to id
			for (var i=0; i< hash.length;i++)
			{

				if('a'<=hash[i] && hash[i]<='z')
				{
					 id = (id*62) + hash[i].charCodeAt(0) - a.charCodeAt(0);
					 
				}
				if ('A' <= hash[i] && hash[i] <= 'Z')
				{
          			id = id*62 + hash[i].charCodeAt(0) - A.charCodeAt(0) + 26;
      			}
        		if ('0' <= hash[i] && hash[i] <= '9')
        		{
          			id = id*62 + hash[i].charCodeAt(0) - z.charCodeAt(0) + 52;
          		}
			}*/

			MongoClient.connect(murl, function(err, db) {  //get famous item for home page
  			assert.equal(null, err);
  			db.collection("link").find({id:hash},{originalURL:1,_id:0}).toArray(function(err, result) {
    		if (err) throw err;
    		console.log(hash,result[0]);
    		db.collection("link").find({id:hash},{count:1,_id:0}).toArray(function(err, resu) {
    		if (err) throw err;
    		var count=resu[0].count+1;
    		db.collection("link").update({id:hash},{$set:{'count':count}},function(err,resul) {
      		if (err) throw err;
    		response.redirect(result[0].originalURL);
    		db.close();
    		response.end();
    		});
    		});
			});
			
		});
			//logic to get URL and increment count by 1
});


app.listen(3000)
