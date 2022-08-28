import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import uploadConfig from './config/upload';
import AppDataSource from './data-source';
import AppError from './errors/AppError';
import routes from './routes'; // routes é um Middleware

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/files', express.static(uploadConfig.directory));
  app.use(routes);

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      console.log(err);

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );

  app.listen(process.env.PORT, () => {
    console.log('🚀 Server started 3333!');
  });
});
