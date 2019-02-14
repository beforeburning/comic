const express = require('express'),
  router = express.Router(),
  sql = require('../module/sql');

router.get('/', (req, res) => {
  let val = req.query.val,
    parent = req.query.parent,
    type = req.query.type;

  // nav
  const nav = new Promise((resolve) => {
    sql.navData((callback) => {
      resolve(callback)
    })
  });

  if (type == 'comic') {

    // 漫画标题
    const comicTitle = new Promise((resolve) => {
      sql.comicTitleData(parent, (callback) => {
        resolve(callback[0].name)
      })
    });

    // 漫画搜索
    const comicSearch = new Promise((resolve) => {
      sql.comicSearchData(parent, val, (callback) => {
        resolve(callback)
      })
    });

    Promise.all([nav, comicTitle, comicSearch]).then((callback) => {
      res.render('search', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        title: callback[1],
        searchList: callback[2],
        parenttitle: `${callback[1]}-${val}`,
        parent: parent,
        type: type,
      });
    })

  } else if (type === 'novel') {

    // 小说标题
    const novelTitle = new Promise((resolve) => {
      sql.novelTitleData(parent, (callback) => {
        resolve(callback[0].name);
      })
    });

    // 小说搜索
    const novelSearch = new Promise((resolve) => {
      sql.novelSearchData(parent, val, (callback) => {
        resolve(callback)
      })
    });

    Promise.all([nav, novelTitle, novelSearch]).then((callback) => {
      res.render('search', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        title: callback[1],
        searchList: callback[2],
        parenttitle: `${callback[1]}-${val}`,
        parent: parent,
        type: type,
      });
    })

  } else {
    res.send('404');
  }
});

module.exports = router;
