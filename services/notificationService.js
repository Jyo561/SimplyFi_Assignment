const { pool } = require('../config/db');

exports.sendNotification = async (userId, articleId, message) => {
  await pool.query(
    'INSERT INTO notifications (user_id, article_id, message) VALUES ($1, $2, $3)',
    [userId, articleId, message]
  );
};
