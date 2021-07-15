import express from 'express';
import dotenv from 'dotenv';
import connecDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler} from './middleware/error.js';

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

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode`.bgCyan ))