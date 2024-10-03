import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import noteRoutes from './routes/noteRoutes.js';
import errorHandler from './utils/errorHandler.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import session from 'cookie-session';
import passport from './config/passportConfig.js';

dotenv.config();

const app = express();

app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
  cookie: {
    secure: true, 
    sameSite: 'None'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(bodyParser.json());
app.use('/api', noteRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
