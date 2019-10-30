const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compress = require('compression');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const errorInterceptor = require('./interceptors/error.interceptor');

let app = express();

// Server app setup
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.disable('etag');

// API definition
const api = require('./routes');
app.use(api);

// Error handling
app.use(errorInterceptor);

module.exports = app;