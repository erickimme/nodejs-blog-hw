import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import ErrorHandler from './middlewares/errorHandler.js';
import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', [router]);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
