const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const message = `
    Hit /check with either a GET or POST request passing: 
    1. an 'input' parameter with your text at QueryString (for GET) or Body as JSON (for POST) 
    2. an 'language' parameter with your language code at QueryString (for GET) or Body as JSON (for POST) - Default: pt-BR`;

    res.send(message);
  });

module.exports = router;
