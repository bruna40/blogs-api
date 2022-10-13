const express = require('express');
const UserRoute = require('./routes/UserRouter');
const LoginRouter = require('./routes/LoginRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const BlogPostRouter = require('./routes/BlogPostRouter');

// ...

const app = express();

app.use(express.json());
app.use(LoginRouter, UserRoute, CategoryRouter, BlogPostRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
