import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmedAccount: {
        type: Boolean,
        default: false
    },

    // 🔐 Token de un solo uso
    otp: {
        type: String, // puedes guardar un string o hash
        default: null
    },
    otpExpires: {
        type: Date, // hasta cuándo es válido
        default: null
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
};

export const User = model('User', userSchema);