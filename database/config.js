import mongoose from 'mongoose';

export const conectarDB = async() => {

    const dbURL = process.env.DB_URL;

    try {
        
        await mongoose.connect(dbURL);

        console.log('Conexion a mongoDB exitosa');

    } catch (error) {
        throw new Error('Error al conectar a la DB', error);
    }

}