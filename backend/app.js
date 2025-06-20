import express from 'express';
import dotenv from 'dotenv';
import aiRoute from './src/routes/ai.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const corsOption = {
    origin : process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://carrerthink.onrender.com",
    methods : "GET ,  POST , PUT , DELETE , PUT , PATCH ,  HEAD",
    credentials: true,
}

const PORT = process.env.PORT || 5000;

app.use(cors(corsOption)); 
app.use(express.json());

app.use('/api/ai', aiRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port number: ${PORT}`);
});
