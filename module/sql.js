/**
 User: burning <923398776@qq.com>
 Date: 2018年11月20日
 */
const mysql = require('mysql'),
  connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'funny'
  });
connection.connect();

let sql = {
  // nav 数据
  navData (callback) {
    const comicNavSql = `SELECT * FROM jk_funny_img_cate WHERE parent_id = 0`,
      novelNavSql = `SELECT * FROM jk_novel_cate WHERE parent_id = 0`;

    const comic = new Promise((resolve) => {
      connection.query(comicNavSql, (error, results) => {
        if (error) throw error;
        resolve(results);
      });
    });

    const novel = new Promise((resolve) => {
      connection.query(novelNavSql, (error, results) => {
        if (error) throw error;
        resolve(results);
      });
    });

    Promise.all([comic, novel]).then((values) => {
      callback(values);
    });
  },
  // 漫画列表
  comicListData (parent, pages, pagemax, callback) {
    const comicListSql = `SELECT * FROM jk_funny_img_cate WHERE parent_id = ${parent} limit ${(pages - 1) * pagemax},${pagemax}`;
    connection.query(comicListSql, (error, results) => {
      if (error) throw error;
      callback(results)
    });
  },
  // 小说列表
  novelListData (parent, pages, pagemax, callback) {
    const novelListSql = `SELECT * FROM jk_novel_cate WHERE parent_id = ${parent} limit ${(pages - 1) * pagemax},${pagemax}`;
    connection.query(novelListSql, (error, results) => {
      if (error) throw error;
      callback(results)
    });
  },
  // 漫画根据ID查询标题
  comicTitleData (parent, callback) {
    const titleSql = `SELECT * FROM jk_funny_img_cate WHERE id = ${parent}`;
    connection.query(titleSql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 小说根据ID查询标题
  novelTitleData (parent, callback) {
    const titleSql = `SELECT * FROM jk_novel_cate WHERE id = ${parent}`;
    connection.query(titleSql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 漫画章节
  comicChapterData (id, callback) {
    const comicChapterSql = `SELECT * FROM jk_funny_img_cate WHERE parent_id = ${id} GROUP BY id ASC`;
    connection.query(comicChapterSql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 小说章节
  novelChapterData (id, callback) {
    const novelChapterSql = `SELECT * FROM jk_novel WHERE title_id = ${id} GROUP BY id ASC`;
    connection.query(novelChapterSql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 漫画详情
  comicContentData (id, callback) {
    const imgsql = `SELECT * FROM jk_funny_img WHERE chapter_id =  ${id} GROUP BY id ASC`;
    connection.query(imgsql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 漫画 上一页 下一页
  comicPrevData (chapter, callback) {
    const prevsql = `SELECT * FROM jk_funny_img_cate WHERE parent_id = ${chapter} GROUP BY id ASC`;
    connection.query(prevsql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 小说详情
  novelContentData (id, callback) {
    const imgsql = `SELECT * FROM jk_novel WHERE id = ${id} GROUP BY id ASC`;
    connection.query(imgsql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 小说 上一页下一页
  novelPrevData (chapter, callback) {
    const prevsql = `SELECT * FROM jk_novel WHERE title_id = ${chapter} GROUP BY id ASC`;
    connection.query(prevsql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 漫画搜索
  comicSearchData (parent, val, callback) {
    const searchsql = `SELECT * FROM jk_funny_img_cate WHERE parent_id = ${parent} AND name LIKE "%${val}%" `;
    connection.query(searchsql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },
  // 小说搜索
  novelSearchData (parent, val, callback) {
    const searchsql = `SELECT * FROM jk_novel_cate WHERE parent_id = ${parent} AND name LIKE "%${val}%" `;
    connection.query(searchsql, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
};

module.exports = sql;
