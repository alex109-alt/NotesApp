const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Routes
const indexRouter = require('../routes/index');
const notesRouter = require('../routes/notes');
const app = express();

// Settings
// View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/notes', notesRouter);

// Catch 404 error handle
app.use((req, res, next) => {
    next(createError(404));
    res.status(404).send('404');
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'develoment' ? err: {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
