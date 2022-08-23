import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.routes';
import languageRoutes from './routes/language.routes';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Enable CORS for multiple domains
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', ' *');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Max-Age', 300);

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/languages', languageRoutes);

export default app;
