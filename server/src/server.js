import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import i18n from 'i18n';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

i18n.configure({
  locales: ['en', 'mk', 'al', 'tr'],
  directory: './locales',
  defaultLocale: 'en',
  cookie: 'lang',
});

app.use(i18n.init);
app.use((req, res, next) => {
  res.locals.__ = res.__ = req.__;
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
