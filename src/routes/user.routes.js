import { Router  } from "express";
import userControl  from "../controllers/user.controller.js";



const router = Router();


// route para todos los registros
router.get("/all",userControl.getAllUsers);


// route para el registro de un usuario
router.post("/register",userControl.addOneUser);


// route para el login de un usuario
router.post("/login",userControl.validateUserLogin);






export default router;