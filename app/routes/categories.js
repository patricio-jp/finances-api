import { Router } from 'express';
const router = Router();
import { createCategory, deleteCategory, getCategoryByID, getCategories, restoreCategory, updateCategory } from '../controllers/categories.js';
import { paramsValidator } from '../validators/params.js';
import { categoryValidator, orderByValidator } from '../validators/categories.js';

router.get('/', paramsValidator, orderByValidator, getCategories);
router.get('/:id', getCategoryByID);
router.post('/', categoryValidator, createCategory);
router.put('/:id', categoryValidator, updateCategory);
router.delete('/:id', deleteCategory);
router.patch('/:id/restore', restoreCategory);

export default router;
