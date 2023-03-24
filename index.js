const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('/'));
app.use(cors());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.flushHeaders();

  setInterval(() => {
    const data = {
      message: `Current time is ${new Date().toLocaleTimeString()}`
    };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);
});
