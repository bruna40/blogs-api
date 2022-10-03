const express = require('express');
const LoginRoute = require('./routes/LoginRoute');

// ...

const app = express();

app.use(express.json());
app.use('/login', LoginRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
