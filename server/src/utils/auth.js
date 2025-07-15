const { v4: uuidv4 } = require('uuid');
const postsRouter = require('../routes/posts');

// This map will be shared with the router for authentication
if (!global.tokenUserMap) global.tokenUserMap = {};
const tokenUserMap = global.tokenUserMap;

function generateToken(user) {
  const token = uuidv4();
  tokenUserMap[token] = user;
  return token;
}

module.exports = { generateToken };
