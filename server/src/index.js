import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index.js';
import cors from 'cors'
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use('/api', rootRouter);

app.listen(8080, () => {
  console.log(`Server  listening on port ${8080}`);
});
