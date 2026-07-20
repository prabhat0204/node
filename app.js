const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/echo', (req, res) => {
  const payload = Object.keys(req.query).length > 0 ? req.query : { message: 'GET received' };
  res.json({ method: 'GET', payload });
});

app.post('/echo', (req, res) => {
  res.json({ method: 'POST', payload: req.body ?? {} });
});

app.put('/echo', (req, res) => {
  res.json({ method: 'PUT', payload: req.body ?? {} });
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Echo service is running' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Echo service listening on port ${port}`);
  });
}

module.exports = app;
