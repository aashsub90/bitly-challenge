var express = require('express');
var Request=require('request');
var router = express.Router();
var _id=1234;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ninja Hackathon cmpe281'});
});

router.post('/shortlink', function(req, response, next) {
_id=_id+1;
var url = req.body.url;
Request.post('http://localhost:3000/short/'+_id+'/'+url, function (error, res, body) {
 	           if (error) {
                throw error;
            }
 
            var data = JSON.parse(body);

            response.render('shortgen', { title: 'Ninja Hackathon cmpe281',link:JSON.stringify(data)});
});
});

router.get('/mosthits', function(req, response, next) {
Request.get('http://18.217.26.104:3000/mosthits', function (error, res, body) {
 	           if (error) {
                throw error;
            }
 			console.log(body);
            data = JSON.parse(body);
           var product=data;
            response.render('index', {products: product});
});
});

module.exports = router;