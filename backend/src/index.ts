import express from 'express';
import { config_port } from './config/config';
import router from './routes/auth.route';
const app = express();
app.use(express.json());
const port = config_port;

app.get('/', (req, res) => {
  res.send('Testing the page to see if its working');
});
app.use('/api/v1/auth', router);
const startServer = () => {
  console.log('checking if its connected ');
  app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`);
  });
};

startServer();
