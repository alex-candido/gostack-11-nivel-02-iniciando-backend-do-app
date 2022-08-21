import express from 'express';
import uploadConfig from './config/upload';
import AppDataSource from './data-source';
import routes from './routes'; // routes é um Middleware

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use('/files', express.static(uploadConfig.directory));
  app.use(routes);

  app.listen(process.env.PORT, () => {
    console.log('🚀 Server started 3333!');
  });
});
