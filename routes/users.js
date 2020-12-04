var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// get请求写法
// router.get('/api/blog/list', (req, res, next) => {
//   const { author, keyword } = req.query;
//   res.json({
//     author
//   })
// })


module.exports = router;
