import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
//import centralizedErrorHandler from './middleware/error_handling/error_handler.cjs'; // Keeping this .cjs since it's CommonJS
import signupRoute from './api/routes/signup/signup';
import newUserRoute from './api/routes/newUser/newUser'
import getUserData from './api/routes/userData/userData'
import getProperties from './api/routes/properties/getProperties'


const app = express();

const frontendURL = process.env.FRONTEND_URL;

const allowedOrigins = [
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin: string, callback: (err: Error | null, isOriginAllowed: boolean) => void) => {
    if (!origin) return callback(null, true); // Allow requests with no origin (e.g., mobile apps)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Explicitly handle preflight (OPTIONS) requests
//app.options(frontendURL, cors());

// Resource headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Load routes
app.use('/signup', signupRoute)
app.use('/newuser', newUserRoute)
app.use('/user', getUserData)
app.use('/properties', getProperties)

//app.use(centralizedErrorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
