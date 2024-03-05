import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes/index.js';

const server = express();
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
server.use('/', routes);

// Error catching endware.
server.use((error, request, response, next) => { // eslint-disable-line no-unused-vars
  const status = error.status || 500;
  const message = error.message || error;
  console.error(error);
  response.status(status).send(message);
});

server.get('*', (request, response) => {
  console.log(__dirname);
  response.sendFile(path.resolve(__dirname, 'rick_and_morty\\client\\public\\index.html'));
});

export default server;