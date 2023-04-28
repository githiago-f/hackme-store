import {createServer} from "node:http";
import {rootLogger} from "./infra/logging/root-logger.js";
import app, {port} from './app.js';

const address = process.env.ADDR || '0.0.0.0';

const server = createServer(app);
server.listen(port, address, () => {
  rootLogger.info(address);
  app.set('address', address);
  rootLogger.info(`Listening on http://${address}:${port} or http://localhost:${port}`);
});
