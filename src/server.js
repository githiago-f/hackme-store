import {createServer} from "node:http";
import {rootLogger} from "./infra/logging/root-logger.js";
import app, {port} from './app.js';

const server = createServer(app);
server.listen(port, '0.0.0.0', () => {
  let serverAddress = server.address();
  let { address } = serverAddress;
  rootLogger.info(serverAddress);
  if(address === '0.0.0.0' || address === '::') {
    address = '192.168.0.21';
  }
  app.set('address', address);
  rootLogger.info(`Listening on http://${address}:${port} or http://localhost:${port}`);
});
