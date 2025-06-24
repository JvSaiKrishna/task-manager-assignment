import express from 'express';
import {authMiddleware} from "../middleware/authMiddleware.js"
import { createTask, getTasks, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', authMiddleware,getTasks)

router.post('/',authMiddleware,createTask)

router.put('/:id', authMiddleware,updateTask)

export default router;
