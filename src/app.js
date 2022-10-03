const express = require('express');
const UserRoute = require('./routes/UserRoute');

// ...

const app = express();

app.use(express.json());
app.use(UserRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
