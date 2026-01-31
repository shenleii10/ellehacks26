import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.js';
import { loadEnv } from './config/env.js';

loadEnv();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
