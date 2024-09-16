const Redis = require('redis');
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL, 
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = { redisClient };
