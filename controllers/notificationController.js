const { client } = require('../config/db');

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  const result = await client.query('SELECT * FROM notifications WHERE user_id = $1', [userId]);
  res.json(result.rows);
};
