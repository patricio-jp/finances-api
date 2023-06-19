import { body, check, query } from "express-validator";
import { validateResult } from "../helpers/functions.js";

export const orderByValidator = [
    query("orderBy").optional().isIn(["id", "name", "description", "createdAt", "updatedAt"]),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const categoryValidator = [
    check("id").optional({ checkFalsy: true }).isInt(),
    body("name").exists().notEmpty().isString(),
    body("description").optional({ checkFalsy: true }).isString(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];