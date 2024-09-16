const { redisClient } = require('../config/redis');

exports.cacheArticleViews = (articleId) => {
  redisClient.zincrby('popular_articles_views', 1, articleId);
};

exports.cacheArticleLikes = (articleId) => {
  redisClient.zincrby('popular_articles_likes', 1, articleId);
};
