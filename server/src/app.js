import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import comidaRoute from './api/routes/comida.js';
import { errorHandler } from '../middleware/errorHandler.js';

dotenv.config();

const dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(express.static(path.join(dirname, '/public')));

app.use(express.json());

app.use(errorHandler);
// app.use(notFoundHandler);

app.use('/', comidaRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server running'));
