const express = require('express');
const UserRoute = require('./routes/UserRoute');
const LoginRouter = require('./routes/LoginRoutes');
const CategoryRouter = require('./routes/CategoryRoute');

// ...

const app = express();

app.use(express.json());
app.use(LoginRouter, UserRoute, CategoryRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
