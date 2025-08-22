import { generateJWT } from '../helpers/generateJWT.js';
import { generateOTP } from '../helpers/generateOTP.js';
import { sendOTPEmail } from '../helpers/sendOTPEmail.js';
import { User } from '../models/User.js';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/** @param {Request} req @param {Response} res */
const registerUser = async(req, res) => {

    const {email} = req.body;

    let user = await User.findOne({email});

    if(user) {
        const error = new Error('The email provided is already in use.');
        return res.status(400).json({
            ok: false,
            msg: error.message
        });
    }

    user = new User(req.body);

    try {
        await user.save();
        res.status(201).json({
            ok: true,
            msg: 'Successfully registered user.'
        });
    } catch (error) {
        console.log('Ha ocurrido un error', error);
    }

};

/** @param {Request} req @param {Response} res */
const loginUser = async(req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(404).json({
            ok: false,
            msg: 'The email provided is not registered.'
        });
    };

    if(!(await user.checkPassword(password))) {
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect password.'
        });
    };

    if(!user.confirmedAccount) {

        user.otp = generateOTP();
        user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutos
        await user.save();

        // TODO: enviar correo electronico con el OTP
        await sendOTPEmail(user.name, user.email, user.otp);
        return res.status(401).json({
            ok: false,
            msg: 'Your account has not been confirmed.'
        });
    };

    // TODO: Generar JWT
    const token = generateJWT(user.id, user.name);

    res.status(201).json({
        ok: true,
        id: user.id,
        name: user.name,
        email: user.email,
        token
    });
};

/** @param {Request} req @param {Response} res */
const verifyOTP = async(req, res) => {
    const {email, otp} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: 'The email provided is not registered.'
        });
    };

    if (user.otp !== otp) {
        return res.status(400).json({
            ok: false,
            msg: 'OTP not valid.'
        });
    };

    if (user.otpExpires < Date.now()) {
        return res.status(400).json({
            ok: false,
            msg: 'OTP expired.'
        });
    };
    
    user.otp = null;
    user.otpExpires = null;
    user.confirmedAccount = true;
    await user.save();
    
    // TODO: generar JWT

    const token = generateJWT(user.id, user.name);
   
    res.status(201).json({
        ok: true,
        id: user.id,
        name: user.name,
        email: user.email,
        token
    });
    
};

/** @param {Request} req @param {Response} res */
const revalidateJWT = async(req, res) => {

    const {id, name} = req;

    const token = generateJWT(id, name);

    res.json({
        ok: true,
        token
    });
};

/** @param {Request} req @param {Response} res */
const resendOTP = async(req, res) => {

   try {
        const {email} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'The email provided is not registered.'
            });
        };

        if (user.confirmedAccount) {
            return res.status(400).json({ msg: "Account already confirmed." });
        }

        // Comprobar si se ha enviado un otp en el ultimo minuto
        // TODO: implementar con un otpSentAt con timestamp en mongo
        // if (user.otpExpires && user.otpExpires > Date.now() - 60 * 1000) {
        //     return res.status(429).json({ msg: "Please wait a minute before resending another OTP." });
        // }
        
        user.otp = generateOTP();
        user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutos
        await user.save();
        
        // TODO: enviar correo electronico con el OTP
        await sendOTPEmail(user.name, user.email, user.otp);
        res.status(200).json({
            ok: true,
            msg: 'New OTP code sent to your email.'
        });
   } catch (error) {
        console.error(error);
        res.status(500).json({ 
            ok: false,
            msg: "Error to resending OTP code." 
        });
   };

};

export {
    registerUser,
    loginUser,
    verifyOTP,
    resendOTP,
    revalidateJWT,
}