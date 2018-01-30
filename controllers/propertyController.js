var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
const Property = require('../models/propertyModel');
const fs = require('fs');
const request = require('request');
var curl = require("curlrequest");

var propertyController = {};

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// function scrape(url,file){
// 	request(url, function (error, response, body) {
// 	  if (!error && response.statusCode == 200) {
// 	  	console.log('request url: '+url);
// 	  	console.log('request file: '+file);
// 	  	fs.writeFile(file, body);
// 	  }
// 	});
// }

propertyController.show = function(req, res, next){
	var token = getToken(req.headers);
  if(token){
    // if(req.query.search){
    //   const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  	// 	Property.find({"locality": regex},function(err, property_data){
  	// 			if(err) {
  	// 				return next(err);
  	// 			}
  	// 			if(property_data.length < 1) {
  	// 				res.json(property_data);
  	// 			}
  	// 			else{
  	// 				res.json(property_data);
  	// 			}
  	// 	});
    // }
	    Property.find(function (err, properties) {
	      if (err) return next(err);
	      res.json(properties);
	    });
		}
		else
	    return res.status(403).send({success: false, msg: 'Unauthorized.'});

	// var options = {url: 'https://pwa.infoedge.com/99mobapi/v0/propertyDetail/qwerty/G30244743?rtype=json&',
	// 							method:'GET',rejectUnauthorized: false};
	// curl.request(options.url,function(err,data){
	// 	if(err) throw err;
	// 	console.log(data);
	// });
	// var url = 'https://pwa.infoedge.com/99mobapi/v0/propertyDetail/qwerty/G30244743?rtype=json&';
	// var file = 'log.txt';
	// scrape(url,file);
};

var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

propertyController.save = function(req,res,next){
  var token = getToken(req.headers);
  if(token){
    Property.create(req.body).then(function(err,data){
			if (err) {
        return res.json({success: false, msg: 'Save property failed.'});
      }
      res.json({success: true, msg: 'Successful created new property.'});
    }).catch(next);
  }
  else{
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
};

module.exports = propertyController;
