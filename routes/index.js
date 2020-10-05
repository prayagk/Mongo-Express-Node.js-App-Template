const express = require('express');
const router = express.Router();
const query = require('../src/db/queries/query');

router.post('/sign-up', async (req, res, next) => {
  const { name, email } = req.body;
  
  const result = await query.signUp(name, email);  
  res.json(result);
});

module.exports = router;
