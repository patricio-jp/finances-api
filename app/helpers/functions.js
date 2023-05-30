import brcyptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

/**
 * Hash text with bcryptjs
 * @param {*} text 
 * @returns hashed text
 */
export const encrypt = async (text) => {
    return await brcyptjs.hash(text, 10);
}

/**
 * Compare text with hash
 * @param {*} text 
 * @param {*} hash 
 * @returns boolean
 */
export const compare = async (text, hash) => {
    return await brcyptjs.compare(text, hash);
}

/**
 * Validate results from express-validator
 */
export const validateResult = (req, res, next) => {
    // console.log(req);
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(400).send({ errors: err.array() });
    }
}

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            surname: user.surname,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

export const verifyToken = async (token) => {
    await jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return null;
        } else {
            return decoded;
        }
    })
}
