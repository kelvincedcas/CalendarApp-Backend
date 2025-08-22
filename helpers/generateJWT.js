import jwt from 'jsonwebtoken';

export const generateJWT = (id, name) => {

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const payload = {id, name};
    return jwt.sign(payload, jwtSecretKey, {
        expiresIn: '2h'
    });
}