import express, { Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';
import config from '../wx.config';
import { handlePage, handleRender } from './helpers';

// dotenv.config();
const staticOptions = {
  maxAge: 2592000,
};
const server = express();

server.use(compression());
server.use(bodyParser.json());
server.use(
  express.static(path.join(process.cwd(), 'public/client_dist'), staticOptions)
);

server.use((req, res, next) => {
  if (req.url.includes('.')) {
    return next();
  }
  try {
    res.sendFile(path.join(process.cwd(), 'public/client_dist/main.html'));
  } catch (e) {
    console.log(e);
  }
});
// server.use(handleRender);

server.listen(config.port || 3000, () =>
  console.log(`Server ran on :${config.port || 3000}`)
);
