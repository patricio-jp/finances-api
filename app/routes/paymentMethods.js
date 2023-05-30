import { Router } from 'express';
const router = Router();
import { createPaymentMethod, deletePaymentMethod, getPaymentMethodByID, getPaymentMethods, restorePaymentMethod, updatePaymentMethod } from '../controllers/paymentMethods.js';
import { paramsValidator } from '../validators/params.js';
import { orderByValidator, paymentMethodValidator } from '../validators/paymentMethods.js';

router.get("/", paramsValidator, orderByValidator, getPaymentMethods);
router.get("/:id", getPaymentMethodByID);
router.post("/", paymentMethodValidator, createPaymentMethod);
router.put("/:id", paymentMethodValidator, updatePaymentMethod);
router.delete("/:id", deletePaymentMethod);
router.patch("/:id/restore", restorePaymentMethod);

export default router;
