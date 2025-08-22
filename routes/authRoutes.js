import express from 'express';
import { verifyOTP, loginUser, resendOTP, registerUser, revalidateJWT } from '../controllers/authController.js';
import {check} from 'express-validator';
import { fieldsCheck } from '../middlewares/fieldsCheck.js';
import { jwtCheck } from '../middlewares/jwtCheck.js';

const router = express.Router();

router.post(
    '/register', 
    [ // Middlewares
        check('name', 'Your name is required').not().isEmpty(),
        check('email', 'Your email is incorrect').isEmail(),
        check('password', 'Your password must be more than 6 characters long').isLength({min: 7}),
        fieldsCheck
    ],
    registerUser
);

router.post(
    '/login', 
    [ // Middlewares
        check('email', 'Your email is required').isEmail(),
        check('password', 'Your password must be more than 6 characters long').isLength({min: 7}),
        fieldsCheck
    ],
    loginUser
);

router.post(
    '/verify-otp',
    [ // Middlewares
        check('email', 'Your email is required').isEmail(),
        check('otp', 'The OTP code must be that 6 characters long').isLength({min: 6, max: 6}),
        fieldsCheck
    ],
    verifyOTP
);

router.post(
    '/resend-otp',
    [ // Middlewares
        check('email', 'Your email is required').isEmail(),
        fieldsCheck
    ],
    resendOTP
);


router.get(
    '/renew', 
    jwtCheck,
    revalidateJWT
);

export default router;
