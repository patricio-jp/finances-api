import { query } from "express-validator";
import { validateResult } from "../helpers/functions.js"

export const paramsValidator = [
    query("includeDeleted").optional({ checkFalsy: true }).isBoolean(),
    query("page").optional({ checkFalsy: true }).isNumeric(),
    query("pageSize").optional({ checkFalsy: true }).isNumeric(),
    query("orderBy").optional({ checkFalsy: true }).isString(),
    query("orderDir").optional({ checkFalsy: true }).isIn(["asc", "desc"]),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];
