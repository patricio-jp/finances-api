import { Router } from "express";
const router = Router();
import paymentMethods from "./paymentMethods.js"
import categories from "./categories.js"

router.use("/payment-methods", paymentMethods);
router.use("/categories", categories);

router.get('*', (req, res) => {
    res.status(404).send({ error: "Not Found" });
});

export default router;
