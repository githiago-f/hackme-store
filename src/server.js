import {createServer} from "node:http";
import {createServer as createSecureServer} from "node:https";
import {rootLogger} from "./infra/logging/root-logger.js";
import app, {httpPort, httpsPort} from './app.js';
import { readFileSync } from "node:fs";
import { join } from "node:path";

const address = process.env.ADDR || '0.0.0.0';
app.set('address', address);
rootLogger.info(address);

const sslOptions = {
  cert: readFileSync(join(process.cwd(), 'cert.pem')), 
  key: readFileSync(join(process.cwd(), 'key.pem'))
};

const secureServer = createSecureServer(sslOptions, app);
secureServer.listen(httpsPort, '0.0.0.0', () => {
  rootLogger.info(`Listening on https://${address}:${httpsPort} or https://localhost:${httpsPort}`);
});

const server = createServer(app);
server.listen(httpPort, '0.0.0.0', () => {
  rootLogger.info(`Listening on http://${address}:${httpPort} or http://localhost:${httpPort}`);
});
