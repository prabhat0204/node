const express = require('express');

const router = express.Router();

router.get('/echo', (req, res) => {
  const payload = Object.keys(req.query).length > 0 ? req.query : { message: 'GET received' };
  res.json({ method: 'GET', payload });
});

router.post('/echo', (req, res) => {
  res.json({ method: 'POST', payload: req.body ?? {} });
});

router.put('/echo', (req, res) => {
  res.json({ method: 'PUT', payload: req.body ?? {} });
});

module.exports = router;
