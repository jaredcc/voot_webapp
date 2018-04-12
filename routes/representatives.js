var express = require('express');
var router = express.Router();

/* GET representatives page. */
router.get('/', function(req, res, next) {
  res.render('representatives');
});

module.exports = router;
