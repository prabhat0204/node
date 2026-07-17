// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN || 'tttt-aaaa-bbbb-cccc';

if (!process.env.VERIFY_TOKEN) {
  console.warn('VERIFY_TOKEN environment variable not set. Using fallback token "tttt-aaaa-bbbb-cccc".');
}
console.log('VERIFY_TOKEN:', verifyToken);

// Route for GET requests
app.get('/', (req, res) => {
  console.log('WEBHOOK VERIFIED111');
  console.log('req.query:', req.query);

  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  console.log('===========================');
  //console.log('req.body:', req.body);
  const body = req.body;
  const value = body.entry[0].changes[0].value;

  const phoneNumber = value.messages[0].from;          // Customer phone
  const message = value.messages[0].text?.body;        // Customer message
  const customerName = value.contacts[0].profile.name; // Customer name
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log("Phone Number:", phoneNumber);
  console.log("Customer Name:", customerName);
  console.log("Message:", message);
  //const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  //console.log(`\n\nWebhook received ${timestamp}\n`);
  //console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});