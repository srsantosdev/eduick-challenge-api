import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import '@shared/dependencies';

import { handleErrorsMiddleware } from './middlewares/handleErrorsMiddleware';
import { appRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(appRouter);

app.use(handleErrorsMiddleware);

export default app;
