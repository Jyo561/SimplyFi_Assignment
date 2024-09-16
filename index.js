const express = require('express');
const { initDb } = require('./config/db');
const { redisClient } = require('./config/redis');
require('dotenv').config();
const { pool } = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public')); // Serve static files

app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM articles');
  res.render('index', { articles: result.rows });
});

app.get('/articles', async (req, res) => {
  const result = await pool.query('SELECT * FROM articles');
  res.render('articles', { articles: result.rows });
});

app.get('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
  res.render('article', { article: result.rows[0] });
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.render('user', { users: result.rows });
});

initDb();

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
