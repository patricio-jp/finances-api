import { Router } from "express";
const router = Router();

router.get('*', (req, res) => {
    res.status(404).send({ error: "Not Found" });
});

export default router;
