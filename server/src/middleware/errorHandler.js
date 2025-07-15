// Global error handler middleware for Express
module.exports = (err, req, res, next) => {
  // Example debugging: Log error to console
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};
