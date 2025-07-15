const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/posts', postsRouter);

// Global error handler (debugging technique)
app.use(errorHandler);

module.exports = app;
