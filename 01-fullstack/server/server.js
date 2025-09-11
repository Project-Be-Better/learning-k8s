const express = require('express');
const os = require('os');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
  console.log(`Request received on ${os.hostname()}`);
  res.json({
    message: `Hello from ${os.hostname()}`
  });
});


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
