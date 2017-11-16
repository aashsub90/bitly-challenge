'use strict';

var mongoose = require('mongoose'), shortenerinfo = mongoose.model('urlData');
var uuid = require('node-uuid');
var crypto = require('crypto');

exports.getShortURL = function(req, res) {

  var longURL = req.body.longURL;  
  
  // Check if URL in mongodb

  var query = shortenerinfo.findOne({"originalURL":longURL}).select({ "id": 1, "_id": 0});
  query.exec(function(err,data){
    if(err) {
      console.log("Error reading from DB");
    }
    else{
      return data;
    }
    
  })

  .then(function(data){
    if(data){
      console.log("Data found");

      //Return short URL
      var host = "http://aws12141241/";
      var shortURL = host+data["id"];
      res.json({"shortUrl":shortURL});
    }
    else{
      console.log("No data found");

      // Create a unique ID
      var shortid = require('shortid');
      var id = shortid.generate();

      // Write to DB
      var urlDocument = new shortenerinfo({id:id,originalURL:longURL,count:0});
      urlDocument.save()  
      .then(function(data){

      //Return short URL
      var host = "http://aws12141241/";
      var shortURL = host+data["id"];
      res.json({"shortUrl":shortURL});
  })

    }

  });
};