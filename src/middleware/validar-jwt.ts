import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { firmaJWT } from "../credentials";

export const validarJWTViews = ( req: Request, res: Response, next: NextFunction ) => {
    
    // const token = req.header('x-token');
    const token = req.params.token

    console.log(token)


    if ( !token ) {

        return res.redirect('/auth')
        // return res.status(401).json({
        //     msg: 'No hay token en la peticion'
        // })

    } 

    try {
            
        const payload : any = jwt.verify( token , firmaJWT);

        req.body.uid = payload.uid;

        next();

    } catch (error) {
        console.log('===========================================================')
        console.log('Hubo un error en: src/middleware/validar-jwt.ts line -- 30')        
        console.log('el error es: ' + error)
        console.log('===========================================================')

        // return res.redirect('/auth')
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}