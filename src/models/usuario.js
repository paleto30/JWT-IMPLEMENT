import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        nombre: {
            type: String, 
            required: true,
            min:4,
            max:255, 
            trim: true
        },
        apellido: {
            type: String, 
            required: true,
            min:4,
            max:255, 
            trim: true
        },
        cedula: {
            type: String, 
            required: true,
            min:10,
            max:255, 
            trim: true
        },
        correo: {
            type: String, 
            required: true,
            min:10,
            max:255, 
            trim: true
        },
        clave: {
            type: String, 
            required: true,
            minlength: 8, 
            trim: true
        },
        date:{
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

const userModel = mongoose.model("users", userSchema);


export default userModel;