const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const spaces = require('./routes/spaces.route');
const landing = require('./routes/landing.route');
const templateEngine = require('./config/template-engine');

const app = express();

templateEngine(app);

// @Sequelize connection
const db = require('./config/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', landing);
app.use('/spaces', spaces);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));
