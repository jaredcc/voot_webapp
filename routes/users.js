var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.send('respond with login');
});

router.get('/signup', function(req, res, next) {
  res.send('respond with signup');
});

module.exports = router;
