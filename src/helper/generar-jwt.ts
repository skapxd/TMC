import jwt from 'jsonwebtoken';
import { firmaJWT } from '../credentials';

export const generarJWT = ( email: string) => {

    return new Promise( (resolve, reject) => {
        
        const payload = { email };

        return jwt.sign( payload, firmaJWT, { expiresIn: '4h'}, (err, token ) => {
            
            if ( err ) {
                
                console.log('Ocurrio un error: ' + err);
                reject( 'No se puedo generar el token' )

            } else {
                resolve( token );
            }
        }) 

    });
}