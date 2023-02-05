import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getConnection from "../config/config.js";



/* 
imports de las rutas dispobibles para cada seccionn==================================
*/
import routesUser from "./routes/user.routes.js";

import dashboardRoutes from "./routes/dashboard.js";
import verifyToken from "./routes/tokenValidate.js";
/* 
fin imports===============================================
*/


/* 
configuraciones  =========================================================================================
*/
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}))

dotenv.config();
getConnection();
const PORT =  process.env.PORT;
app.set('port',PORT);

/* 
==========================================================================================================
*/



/* 
rutas de la app ===============================================
*/
/* app.get("/api",(req,res)=>{
    res.send("servidor esta corriendo:  http://localhost:5000");
}) */

// rutas user
app.use("/api/user", routesUser);

// rutas dashboard , (ruta protegida);
app.use("/api/dashboard", verifyToken, dashboardRoutes)


// export default app========================== 
export default app;