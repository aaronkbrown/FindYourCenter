
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.search = function (req, res) {
  var query = req.params.query;
  res.render('search');
};