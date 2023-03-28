import {createServer} from "node:http";
import {rootLogger} from "./infra/logging/root-logger.js";
import app, {port} from './app.js';

const server = createServer(app);
server.listen(port, () => {
  let { address, family } = server.address();
  if(family === 'IPv6' && address === '::') {
    address = 'localhost';
  }
  app.set('address', address);
  rootLogger.info(`Listening on http://${address}:${port}`);
});
