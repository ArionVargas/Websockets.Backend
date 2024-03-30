import express from "express"
import { productManager } from "../index.js"
import cookieParser from "cookie-parser"

const router = express.Router()

//cookie sin firma agregar a otros enrutadores de ser necesario
router.use(cookieParser())


router.get("/login", (req, res) => {
    res.render("login"); // Renderizar plantilla de inicio de sesión
});


router.get('/setcookie', (req,res)=>{
    res.cookie('Cookie','cookie de prueba',{maxAge:10000}).send('cookie asignada con exito')
})

router.get('/getcookie',(req,res)=>{
    res.send(req.cookies)
})

router.get('/deletecookie',(req,res)=>{
    res.clearCookie('Cookie').send('cookie eliminada')
})

router.get('/usuarios',(req,res)=>{
    res.render('users')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

export default router