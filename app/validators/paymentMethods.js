import { body, check, query } from "express-validator";
import { validateResult } from "../helpers/functions.js";

export const orderByValidator = [
    query("orderBy").optional({ checkFalsy: true }).isIn(["id", "name", "balance", "currency", "status", "createdAt", "updatedAt"]),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const paymentMethodValidator = [
    check("id").optional({ checkFalsy: true }).isNumeric(),
    body("name").exists().notEmpty().isString(),
    body("description").optional({ checkFalsy: true }).isString(),
    body("balance").optional({ checkFalsy: true }).isNumeric(),
    body("currency").exists().notEmpty().isISO4217(),
    body("status").optional({ checkFalsy: true }).isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
