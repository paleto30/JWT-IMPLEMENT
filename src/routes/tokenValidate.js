import jwt from "jsonwebtoken";


const verifyToken = (req, res, next)=>{

    //obtennemos el token del header del request

    const token = req.header('auth-token');

    // validamos si no hay tokenn 
    if (!token) {
        return res.status(401).json({error: 'Acesso denegado'})
    }
    try {
        // verificamos el tokeen usando la dependencia de jwt y el metodo .verify
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        // si el token es correcto nos devolvera los datos que pusimos en el token 
        req.user = verified;
        // next() indica que el req paso la prueba y contiene su camino
        next();
    } catch (error) {
        res.status(400).json({error: 'Token no valido , Acesso denegado. =( ...'})
    }
}


export default verifyToken;