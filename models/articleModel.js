const { pool } = require('../config/db');

exports.findArticleById = async (articleId) => {
  const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1', [articleId]);
  return rows[0];
};

exports.updateArticleViews = async (articleId) => {
  await pool.query('UPDATE articles SET views = views + 1 WHERE id = $1', [articleId]);
};
