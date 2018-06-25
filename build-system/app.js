import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use('/', (req, res, next) => {
  res.setHeader('x-mumble', 'grumble');
  next();
});

app.get('/examples', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  const grumble = res.getHeader('x-mumble') || '';
  res.status(200).end(`<!doctype html>
    <html><body>
    <h2>Example page here</h2>
    <div items>
    <ul>
      <li>An x-mumble: ${grumble}</li>
    </ul>
    </div>
   </body></html>`);
});
module.exports = app;
