var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var router = express.Router();

var property = require("../controllers/propertyController");
var user = require("../controllers/userController");

router.post('/signup',user.signUp);
router.post('/signin',user.signIn);

//router.get('/properties', passport.authenticate('jwt', { session: false}),property.show);
router.get('/properties',property.show);
router.post('/properties',passport.authenticate('jwt', { session: false}),property.save);

module.exports = router;
