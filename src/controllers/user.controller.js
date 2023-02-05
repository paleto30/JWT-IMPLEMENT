
import userModel from "../models/usuario.js";
import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

// metodo para obteener todos los registros
const getAllUsers = async (req,res)=>{
    try {
        const usuarios = await userModel.find();
        res.json(usuarios);
    } catch (error) {
        res.send("error en el metodo getAllUsers del controladorUser",error);
        res.status(500);
    }
};



// creamos un esquema  de registro usando las validaciones de Joi
const schemaRegister = Joi.object({

    nombre: Joi.string().min(4).max(255).required(),
    apellido: Joi.string().min(4).max(255).required(),
    cedula: Joi.string().min(10).max(255).required(),
    correo: Joi.string().min(10).max(255).required().email(),
    clave: Joi.string().min(8).max(255).required()


});

// metodo del registro de un usuario + validaciones correo y cifrado de password
const addOneUser = async (req,res)=>{

    // esto es una propiedad "error" que nos entrega el schemaRegiter.validate()
    const {error} = schemaRegister.validate(req.body);

    // si este error existe, aqui se termina la ejecucion devolviendo el error
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    // ahora validaremos si el correo ya esta registrado en nuestra base de datos
    const isEmailExist = await userModel.findOne({
        correo: req.body.correo
    });
    // si existe , enviaremos el error 
    if (isEmailExist) {
        return res.status(400).json(
            {error: "el Email ya esta registrado"}
        )
    }

    // ahora vamos a agregar el hash al password para mas seguridad
    const salt = await bcrypt.genSalt(10);
    const clave = await bcrypt.hash(req.body.clave, salt);

    // creamos el objeto Usuario 
    const user = new userModel({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula : req.body.cedula,
        correo: req.body.correo,
        clave: clave    
    });

    try {    
        const result = await user.save();
        res.json({
            error: null,
            data: result
        });
    } catch (error) {
        res.send("error en el metodo addOneUser del controladorUser")
        res.status(400).json({error})
    }
};



// esquema para el login
const schemaLogin = Joi.object({
   correo: Joi.string().min(10).max(255).required().email(),
   clave: Joi.string().min(8).max(255).required() 
});

// metodo para la validacion del login  
const validateUserLogin = async (req,res) =>{

    // Validacion
    const {error} = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    // validacion y verificacion de existencia
    const user = await userModel.findOne({correo: req.body.correo});
    if (!user) {
        return res.status(400).json({error:"Usuario no encontrado"});
    }

    // validacion password en la DB
    const  passwordValid = await bcrypt.compare(req.body.clave, user.clave);
    if (!passwordValid) {
        return res.status(400).json({
            error: 'Contraseña invalida'
        })
    }

    // procedemos a crear el token  para la sesion del usuario
    const token = jwt.sign({
        name: user.nombre,
        id: user._id
    }, process.env.TOKEN_SECRET);

    // si todo esta  ok , respondemos con el token y el mensaje
    res.header('auth-token',token).json({
        error:null,
        data: {token},
        message : `bienvenido ${user.nombre}`
    });

} // llave final 





const metodos = {
    getAllUsers,
    addOneUser,
    validateUserLogin
}


export default metodos;