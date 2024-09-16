const { pool } = require('../config/db');
const { cacheArticleViews, cacheArticleLikes } = require('../services/cacheService');

exports.getArticles = async (req, res) => {
  const result = await client.query('SELECT * FROM articles');
  res.json(result.rows);
};

exports.createArticle = async (req, res) => {
  const { title, author, body } = req.body;
  const result = await client.query(
    'INSERT INTO articles (title, author, body) VALUES ($1, $2, $3) RETURNING *',
    [title, author, body]
  );
  res.status(201).json(result.rows[0]);
};

exports.viewArticle = async (req, res) => {
  const { articleId } = req.params;
  await client.query('UPDATE articles SET views = views + 1 WHERE id = $1', [articleId]);
  cacheArticleViews(articleId);
  res.status(200).json({ message: 'Article viewed' });
};

exports.likeArticle = async (req, res) => {
  const { userId, articleId } = req.body;
  await client.query('INSERT INTO article_likes (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);
  await client.query('UPDATE articles SET likes = likes + 1 WHERE id = $1', [articleId]);
  cacheArticleLikes(articleId);
  res.status(200).json({ message: 'Article liked' });
};
