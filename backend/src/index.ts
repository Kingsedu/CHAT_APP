import dotenv from 'dotenv';
import express from 'express';
import { config_port, mongo_url, client_url } from './config/config';
import router from './routes/auth.route';
import path from 'path';
import connectDataBase from './db/database';
import { errorHandler } from 'async-handler-express';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/messages.route';
import cors from 'cors';
import { resend_api_key } from './config/config';
dotenv.config();
const app = express();

const _dirname = path.resolve();
// express middleware to be able to access the field that user will use
app.use(cors({ origin: client_url, credentials: true }));
app.use(express.json());
app.use(cookieParser());
const port = config_port;

app.get('/index', (req, res) => {
  res.send('Testing the page to see if its working');
});
app.use('/api/v1/auth', router);
app.use('/api/v1/message', messageRoutes);
app.use(errorHandler);

const startServer = () => {
  console.log('checking if its connected to server');
  console.log('this is the resend api key password', resend_api_key);
  connectDataBase(mongo_url);
  app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`);
  });
};
//make ready for depolyment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'dist', 'index.html'));
  });
}
startServer();
