const express = require('express'),
  router = express.Router(),
  sql = require('../module/sql');

router.get('/', (req, res) => {
  let pages = req.query.pages,
    parent = req.query.id,
    type = req.query.type,
    pagemax = 48;

  // nav
  const nav = new Promise((resolve) => {
    sql.navData((callback) => {
      resolve(callback)
    })
  });

  // 根据分类渲染页面
  if (type === 'comic') {

    // 漫画列表
    const comicList = new Promise((resolve) => {
      sql.comicListData(parent, pages, pagemax, (callback) => {
        resolve(callback);
      })
    });

    // 漫画标题
    const comicTitle = new Promise((resolve) => {
      sql.comicTitleData(parent, (callback) => {
        resolve(callback[0].name)
      })
    });

    Promise.all([nav, comicTitle, comicList]).then((callback) => {
      res.render('list', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        title: callback[1],
        listItem: callback[2],
        pages: pages,
        pagemax: pagemax,
        parent: parent,
        type: type
      });
    })

  } else if (type === 'novel') {

    // 小说列表
    const novelList = new Promise((resolve) => {
      sql.novelListData(parent, pages, pagemax, (callback) => {
        resolve(callback);
      })
    });

    // 小说标题
    const novelTitle = new Promise((resolve) => {
      sql.novelTitleData(parent, (callback) => {
        resolve(callback[0].name);
      })
    });

    Promise.all([nav, novelTitle, novelList]).then((callback) => {
      res.render('list', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        title: callback[1],
        listItem: callback[2],
        pages: pages,
        pagemax: pagemax,
        parent: parent,
        type: type
      });
    })

  } else {
    res.send('404');
  }
});

module.exports = router;
