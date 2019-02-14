const express = require('express'),
  router = express.Router(),
  sql = require('../module/sql');

router.get('/', (req, res) => {
  // 二级列表
  let id = req.query.id,
    parent = req.query.parent,
    type = req.query.type;

  // nav
  const nav = new Promise((resolve) => {
    sql.navData((callback) => {
      resolve(callback)
    })
  });

  if (type === 'comic') {

    // 漫画标题
    const comicTitle = new Promise((resolve) => {
      sql.comicTitleData(parent, (callback) => {
        resolve(callback[0].name)
      })
    });

    // 漫画章节
    const comicChapter = new Promise((resolve) => {
      sql.comicChapterData(id, (callback) => {
        resolve(callback);
      })
    });

    Promise.all([nav, comicTitle, comicChapter]).then((callback) => {
      res.render('chapter', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        title: callback[1],
        chapterList: callback[2],
        chapter: id,
        parent: parent,
        type: type
      });
    })

  } else if (type === 'novel') {

    // 小说标题
    const novelTitle = new Promise((resolve) => {
      sql.novelTitleData(id, (callback) => {
        resolve(callback[0].name);
      })
    });

    // 小说章节
    const novelChapter = new Promise((resolve) => {
      sql.novelChapterData(id, (callback) => {
        resolve(callback);
      })
    });

    Promise.all([nav, novelTitle, novelChapter]).then((callback) => {
      res.render('chapter', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        title: callback[1],
        chapterList: callback[2],
        chapter: id,
        parent: parent,
        type: type
      });
    })

  } else {
    res.send('404');
  }
});

module.exports = router;
