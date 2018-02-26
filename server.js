import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router';
import bodyParser from 'body-parser';

// Connect to MongoDB
mongoose.connect(process.env.PROD_MONGODB);

// Initialize http server
const app = express();
const PORT = process.env.PORT || 3000;

// Logger that outputs all requests into the console
app.use(morgan('combined'));

app.use(bodyParser.json());

// Use v1 as prefix for all API endpoints
app.use('/v1', router);

// Handle / route
app.get('/', (request, response) => {
  response.send('/ rout, Hello Word');
});

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});