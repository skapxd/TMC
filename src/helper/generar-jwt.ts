import jwt from 'jsonwebtoken';
import { firmaJWT } from '../credentials';

export const generarJWT = ( uid: number) => {

    return new Promise( (resolve, reject) => {
        
        const payload = { uid };

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