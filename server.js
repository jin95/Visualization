const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'html')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});
app.get('/1', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', '1.html'));
});
app.listen(3000, () => {
  console.log('Express App on port 3000!');
});
