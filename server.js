import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import router from './router'
import bodyParser from 'body-parser'

// Connect to MongoDB
mongoose.connect('mongodb://localhost/getIn');

// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan('combined'));

app.use(bodyParser.json())

// Use v1 as prefix for all API endpoints
app.use('/v1', router);

// Handle / route
app.get('/', (request, response) => {
  response.send('/ rout, Hello Word');
});

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});