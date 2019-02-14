const express = require('express'),
  router = express.Router(),
  sql = require('../module/sql');

router.get('/', (req, res) => {
  // nav
  const nav = new Promise((resolve) => {
    sql.navData((callback) => {
      resolve(callback)
    })
  });
  Promise.all([nav]).then((callback) => {
    res.render('index', {
      comicNav: callback[0][0],
      novelNav: callback[0][1],
      title: `动漫-${callback[0][0].name}`,
      hover: callback[0][0].id
    });
  })
});

module.exports = router;
