import {Router} from 'express';
import {
    getAll,
    getById,
    getDisponibles,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/controller_productos.js';

const router = Router();

router.get('/', getAll);
router.get('/disponibles', getDisponibles);
router.get('/:id', getById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;