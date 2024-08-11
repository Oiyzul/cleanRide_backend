import express from 'express'
import router from './routes';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json())

// Routes
app.use('/api', router)


export default app