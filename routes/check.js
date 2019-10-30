const express = require('express');
const responseFactory = require('../factories/response.factory');
const SpellcheckBusiness = require('../business/spellcheck.business');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const input = req.query.input;
    const language = req.query.language || 'pt-BR';

    if (!input) return res.json(responseFactory.fail(-1, 'Missing "input" parameter on querystring'));

    const spellcheckBusiness = new SpellcheckBusiness(language);

    const output = await spellcheckBusiness.checkMistakes(input);
    res.json(responseFactory.success(output));
  })
  .post(async (req, res) => {
    const input = req.body.input;
    const language = req.body.language || 'pt-BR';

    if (!input) return res.json(responseFactory.fail(-1, 'Missing "input" parameter on body'));

    const spellcheckBusiness = new SpellcheckBusiness(language);

    const output = await spellcheckBusiness.checkMistakes(input);
    res.json(responseFactory.success(output));
  });

module.exports = router;
