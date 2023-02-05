import Router from "express";

const  router = Router();

router.get("/",(req,res)=>{
    res.json({
        error: null,
        data:{
            title: 'Esta es una ruta protegida',
            user: req.user
        }
    })
})



export default router;