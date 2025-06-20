// src/routes/ai.route.js

import express from 'express';
import { callAI } from '../controllers/ai.controllers.js';

const router = express.Router();

router.post('/ai-call', callAI);

export default router;