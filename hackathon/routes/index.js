var express = require('express');
var Request=require('request');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ninja Hackathon cmpe281'});
});

router.post('/shortlink', function(req, response, next) {

var url = req.body.url;
//----------------------

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

// Configure the request
var options = {
    url: 'http://18.216.252.208:3000/short',
    method: 'POST',
    headers: headers,
    form: {'longURL': url}
}

// Start the request
Request(options, function (error, resp, body) {
     if (error) {
                throw error;
            }
            
            var data = JSON.parse(body);

            response.render('shortgen', { title: 'Ninja Hackathon cmpe281',link:JSON.stringify(data.shortUrl)});
})



//----------------------

/*Request.post('http://18.216.252.208:3000/short/'+url, function (error, res, body) {
 	           if (error) {
                throw error;
            }
            
            var data = JSON.parse(body);

            response.render('shortgen', { title: 'Ninja Hackathon cmpe281',link:JSON.stringify(data.shortUrl)});
});*/
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