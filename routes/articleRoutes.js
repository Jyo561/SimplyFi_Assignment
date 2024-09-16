const express = require('express');
const router = express.Router();
const { getArticles, createArticle, viewArticle, likeArticle } = require('../controllers/articleController');

router.get('/', getArticles);
router.post('/', createArticle);
router.post('/:articleId/view', viewArticle);
router.post('/:articleId/like', likeArticle);

module.exports = router;
