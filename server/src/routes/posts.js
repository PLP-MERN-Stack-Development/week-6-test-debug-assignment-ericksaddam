const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

// Dummy auth middleware for testing
tokenUserMap = {};
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = authHeader.split(' ')[1];
  req.user = tokenUserMap[token];
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// POST /api/posts
router.post('/', auth, async (req, res) => {
  const { title, content, category } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      category,
      slug: title.toLowerCase().replace(/ /g, '-')
    });
    res.status(201).json({ ...post.toObject(), author: post.author.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts (all, filter by category, paginate)
router.get('/', async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  try {
    const posts = await Post.find(filter)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/posts/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Forbidden' });
    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Forbidden' });
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
