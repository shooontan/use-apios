import fs from 'fs';
import { resolve } from 'path';
import express from 'express';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/App';

const apiResponse = () => {
  return (_: express.Request, res: express.Response) => {
    // random error
    if (Math.round(Math.random() + 1) % 2) {
      return res.status(400).json({
        request: false,
      });
    }

    return res.status(200).json({
      request: true,
      user: {
        id: '1234',
        name: 'username',
      },
    });
  };
};

const app = express();

app.use('/static', express.static(__dirname));
app.get('/api/user', apiResponse());
app.post('/api/user', apiResponse());
app.get('*', (_, res) => {
  const markup = renderToString(createElement(App));
  let html = fs.readFileSync(resolve(__dirname, 'index.html')).toString();
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`
  );
  res.status(200).send(html);
});

app.listen(3000, () => console.log('listening on port 3000'));
