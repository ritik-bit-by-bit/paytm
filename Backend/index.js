const express = require('express');
const app = express(); // Declare app first
const cors = require('cors');
const mainRouter = require('./routes/index1');
app.use(express.json());
app.use(cors());
app.use('/api/v1', mainRouter);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
