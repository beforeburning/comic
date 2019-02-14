/**
 User: burning <923398776@qq.com>
 Date: 2018年11月19日
 */
const express = require('express'),
  router = express.Router(),
  sql = require('../module/sql');

// 正文换行
function atStr (e) {
  var dataAt = e.replace(/(\r\n)|(\n)/g, '<br/>');
  return dataAt;
}

router.get('/', (req, res) => {
  // 二级列表
  let id = req.query.id,
    parent = req.query.parent,
    chapter = req.query.chapter,
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
      sql.comicTitleData(id, (callback) => {
        resolve(callback[0].name)
      })
    });

    // 漫画详情
    const comicContent = new Promise((resolve) => {
      sql.comicContentData(id, (callback) => {
        resolve(callback)
      })
    });

    // 漫画 上一页 下一页
    const comicPrev = new Promise((resolve) => {
      sql.comicPrevData(chapter, (callback) => {
        let arr = []
        callback.forEach((val, idx) => {
          if (val.id == id) {
            let p = callback[idx - 1],
              n = callback[idx + 1];
            if (p) {
              let prevUrl = `content?id=${p.id}&parent=${parent}&chapter=${chapter}&type=comic`;
              arr.push(prevUrl)
            } else {
              let prevUrl = '#';
              arr.push(prevUrl);
            }
            if (n) {
              let nextUrl = `content?id=${n.id}&parent=${parent}&chapter=${chapter}&type=comic`;
              arr.push(nextUrl);
            } else {
              let nextUrl = '#';
              arr.push(nextUrl);
            }
          }
        })
        resolve(arr)
      })
    });

    Promise.all([nav, comicTitle, comicPrev, comicContent]).then((callback) => {
      res.render('content', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        url: callback[0].url,
        title: callback[1],
        imglist: callback[3],
        parent: parent,
        chapter: chapter,
        prev: callback[2][0],
        next: callback[2][1],
        type: type,
      });
    })

  } else if (type === 'novel') {

    // 小说 上一页 下一页
    const novelPrev = new Promise((resolve) => {
      sql.novelPrevData(chapter, (callback) => {
        let arr = []
        callback.forEach((val, idx) => {
          if (val.id == id) {
            let p = callback[idx - 1],
              n = callback[idx + 1];
            if (p) {
              let prevUrl = `content?id=${p.id}&parent=${parent}&chapter=${chapter}&type=novel`
              arr.push(prevUrl)
            } else {
              let prevUrl = '#';
              arr.push(prevUrl);
            }
            if (n) {
              let nextUrl = `content?id=${n.id}&parent=${parent}&chapter=${chapter}&type=novel`
              arr.push(nextUrl);
            } else {
              let nextUrl = '#';
              arr.push(nextUrl);
            }
          }
        })
        resolve(arr)
      })
    });

    // 小说详情
    const novelContent = new Promise((resolve) => {
      sql.novelContentData(id, (callback) => {
        resolve(callback)
      })
    });

    Promise.all([nav, , novelPrev, novelContent]).then((callback) => {
      res.render('novel', {
        comicNav: callback[0][0],
        novelNav: callback[0][1],
        url: callback[3][0].url,
        title: callback[3][0].chapter_name,
        novelType: callback[3][0].type,
        content: atStr(callback[3][0].content),
        parent: parent,
        chapter: chapter,
        prev: callback[2][0],
        next: callback[2][1],
        type: type
      });
    })

  } else {
    res.send('404');
  }

});


module.exports = router;
