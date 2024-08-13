import express from 'express'
import router from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json())

// Routes
app.use('/api', router)

app.use(globalErrorHandler)

app.use(notFound)

export default app