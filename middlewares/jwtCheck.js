/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

import jwt from 'jsonwebtoken';

/** @param {Request} req @param {Response} res */
export const jwtCheck = async(req, res, next) => {

    // x-token header
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request.'
        });
    };
    
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {

        const payload = jwt.verify(
            token,
            jwtSecretKey
        );

        req.id = payload.id;
        req.name = payload.name;
        
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false, 
            msg: 'Token invalid.'
        });
    };

 
    next();
};