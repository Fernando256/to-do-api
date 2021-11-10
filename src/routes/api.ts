import { Router } from 'express';

import * as ToDoController from '../controllers/toDoController';

const router = Router();

router.get('/to-do', ToDoController.all);
router.post('/to-do', ToDoController.add);
router.put('/to-do/:id', ToDoController.update);
router.delete('/to-do/:id', ToDoController.remove);



export default router;