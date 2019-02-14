/**
 User: burning <923398776@qq.com>
 Date: 2018年11月21日
 */
const express = require('express'),
  router = express.Router(),
  request = require('request'),
  sql = require('../module/sql'),
  config = require('../config');

function uncompile (e) {
  if (!e) return "";
  let r = e.replace(config.mappingEncryptionIspecial, (e, n) => {
    return config.mappingEncryption[n]
  });
  return r.replace(config.mappingEncryptionRegular, (e, n) => {
    return config.mappingEncryption[n]
  })
}

router.get('/', (req, res) => {

  let pages = req.query.pages || 0,
    val = req.query.val || 'demo',
    size = req.query.size || 0,
    maximg = 30;

  // nav
  const nav = new Promise((resolve) => {
    sql.navData((callback) => {
      resolve(callback)
    })
  });

  //请求接口
  let baiduUrl = `https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&z=${size}&word=${encodeURI(val)}&pn=${(pages - 1) * maximg}&rn=28`

  const imgList = new Promise((resolve) => {
    request(baiduUrl, {json: true}, (err, res, body) => {
      if (err) throw err;
      resolve(body.data);
    });
  });
  Promise.all([nav, imgList]).then((callback) => {
    res.render('img', {
      comicNav: callback[0][0],
      novelNav: callback[0][1],
      imgList: callback[1],
      title: `图片搜索-${val}`,
      val: val,
      size: size,
      prev: `/img?val=${val}&pages=${parseInt(pages) <= 0 ? 0 : (parseInt(pages) - 1)}&size=${size}`,
      next: `/img?val=${val}&pages=${parseInt(pages) + 1}&size=${size}`,
      BaiduImgSelect: config.config.BaiduImgSelect,
      uncompile: uncompile
    });
  })

});

module.exports = router;
