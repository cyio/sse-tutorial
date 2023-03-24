const express = require('express');

const app = express();
app.use(express.static('public'));

app.get('/countdown', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  countdown(res, 1, 10);
});

function countdown(res, id, count) {
  res.write(`id: ${id}\n`);
  res.write('event: count\n');
  res.write(`data: ${JSON.stringify({ count: count })}\n\n`);
  if (count) {
    setTimeout(() => countdown(res, id + 1, count - 1), 1000);
  } else {
    res.end();
  };
}

app.listen(3000, () => console.log('SSE app listening on port 3000!'));
