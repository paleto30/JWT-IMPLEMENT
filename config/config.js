import mongoose from "mongoose";

mongoose.set('strictQuery',false);

const getConnection = async ()=>{
    try {
        const conexion = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const url = `Conectado a mongo en: ${conexion.connection.host}- ON Port: ${conexion.connection.port}`;
        console.log(url);
    } catch (error) {
        console.log(error);
    }
};



export default  getConnection;