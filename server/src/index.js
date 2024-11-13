import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', rootRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(8080, () => {
  console.log(`Server  listening on port ${8080}`);
});
