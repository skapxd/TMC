import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { firmaJWT } from "../credentials";

export const validarJWTViews = ( req: Request, res: Response, next: NextFunction ) => {
    


    const cookie: string[] = req.header('cookie')?.split(';') || [];


    let token: string = '';

    // recorre la lista de cookies
    for (const item of cookie) {
        
        // busca en las cookies si hay un string que coincida con token
        if ( item.indexOf('token') !== -1 ) {

            // separa el string en [clave, valor] y asigna el valor a la variable token 
            token = item.split('=')[1];
            
        }
    }
    
    // cookie.indexOf('token')

    
    console.log(`validarJWT token: ${token}`);



    // const token = req.header('x-token');
    // const token = req.params.token

    // console.log(token)
    // console.log('token this');


    if ( !token ) {

        return res.redirect('/auth')
        // return res.status(401).json({
        //     msg: 'No hay token en la peticion'
        // })

    }  

    try {
            
        const payload : any = jwt.verify( token , firmaJWT);

        req.body.email = payload.email;

        // console.log( payload );

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