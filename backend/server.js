import express from 'express';
import dotenv from 'dotenv';
import connecDB from './config/db.js';
import colors from 'colors';
import {notFound, errorHandler} from './middleware/error.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoute from './routes/orderRoute.js';


dotenv.config();
connecDB();
const app = express();

// body parser--accepting json data in the body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoute);

// paypalroute
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode`.bgCyan ))