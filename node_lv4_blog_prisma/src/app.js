// app.js

import express from 'express';
import cookieParser from 'cookie-parser';
import logMiddleware from './middlewares/log.js';
import errorHandlingMiddleware from './middlewares/errorHandler.js';

import routes from './routes/index.js';

const app = express();
const PORT = 3018;

app.use(logMiddleware);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', routes);
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
