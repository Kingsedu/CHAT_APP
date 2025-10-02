import dotenv from 'dotenv';
import express from 'express';
import { config_port } from './config/config';
import router from './routes/auth.route';
import path from 'path';

dotenv.config();
const app = express();

const _dirname = path.resolve();
app.use(express.json());
const port = config_port;

app.get('/index', (req, res) => {
  res.send('Testing the page to see if its working');
});
app.use('/api/v1/auth', router);
const startServer = () => {
  console.log('checking if its connected ');
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
