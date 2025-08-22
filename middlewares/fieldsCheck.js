/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

import {validationResult} from 'express-validator';

/** @param {Request} req @param {Response} res */
export const fieldsCheck = (req, res, next) => {

    // Manejo de errores
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}