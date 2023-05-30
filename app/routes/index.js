import { Router } from "express";
const router = Router();
import paymentMethods from "./paymentMethods.js"
import { paramsValidator } from "../validators/params.js";

router.use("/payment-methods", paramsValidator, paymentMethods);

router.get('*', (req, res) => {
    res.status(404).send({ error: "Not Found" });
});

export default router;
