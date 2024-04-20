import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/',  async (req, res) => {
    res.send('Hello');
})

app.use(notFound);
app.use(errorHandler);


app.listen(port, (req, res) => {
    console.log(`Server started on port ${port}`);
})