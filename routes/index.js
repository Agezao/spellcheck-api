const express = require('express');

const router = express.Router();

// Routes
const homeRoutes = require('./home');
const checkRoutes = require('./check');

// Unsecured routes
router.use('/', homeRoutes);
router.use('/check', checkRoutes);

module.exports = router;
