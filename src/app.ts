import express from 'express'
import router from './routes';
import notFound from './middlewares/notFound';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json())

// Routes
app.use('/api', router)


app.use(notFound)

export default app