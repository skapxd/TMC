import { Request, Response } from 'express'
import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import { Contact } from '../entity/Contact';
import Mail from '../mail/Mail';
import { Admin } from '../entity/Admin';
import { generarJWT } from '../helper/generar-jwt';
import { adminPass, adminUser } from '../credentials';

interface Email {
    email: string;
    nombre: string;
    telefono: string;
    fecha: string;
}

const email = new Mail();


export const getHome = async ( req: Request, res: Response): Promise<void> => {

    return res.render('home-2.0.hbs', {});
}

export const getGracias = async ( req: Request, res: Response ) : Promise<void> => {
    
    return res.render('gracias', {});
}

export const postForm = async ( req: Request, res: Response) : Promise<Response> => {
    
    
    try {
        let body : Email=  req.body;
        
        let fecha = moment().subtract(5, 'hours').format('YYYY[-]MM[-]DD HH:mm:ss');
        
        body['fecha'] = fecha;         
    
        const newContact = getRepository(Contact).create( body );
        
        const result = await getRepository(Contact).save( newContact );

        // email.sendMail('gerencia@tecnologiamedicacelular.com', {
        email.sendMail('gerencia@tecnologiamedicacelular.com', 
            { msjText: `Tiene un nuevo registro de Tecnología Medíca Celular \n\nCorreo: ${ body.email }\nNombre: ${ body.nombre }\nTelefono: ${ body.telefono }\nFecha: ${ body.fecha }` });


        return res.status(200).json({
            res: result
        }); 

    } catch (err) {

        console.log(`el error es: ${ err }`)
        

        return res.status(200).json({
            res: 'Ocurrio un errorn el controlador',
            err

        });
    }
}

export const getForm = async ( req: Request, res: Response) : Promise<Response> => {

    const contacts = await getRepository(Contact).find();

    return res.json(contacts);
}

export const getAdmin = async ( req: Request, res: Response ) : Promise<void> => {
    
    const contacts = (await getRepository(Contact).find()).reverse()
    
    return res.render('Admin',  {
        contacts
    }) 
}

export const getAuth = async ( req: Request, res: Response) : Promise<void> => {

    console.log(req.params.token)

    return res.render('auth', {})
}

export const postAuth = async (req: Request, res: Response) : Promise<Response> => {

    const { email, pass } = req.body;

    try {
    
        // Verificar si el email existe
        const auth = await getRepository(Admin).findOne({ email });

        console.log(auth)

        if ( !auth ) {
            return res.status(400).json({
                msg: 'Usuario no valido',
                usuario: false
            })
        }
        // Si el usuario esta activo

        // Verificar contraseña
        if ( pass !== auth.pass) {
            return res.status(400).json({
                msg: 'Contraseña no valido',
                pass: false
            })
        }


        console.log(`uid desde controller ${req.body.uid}`)

        // Generar JWT
        const token = await generarJWT( auth.id );

        return res.json({
            // auth,
            token
        })

    } catch (error) {
        console.log('===========================================================')
        console.log('Hubo un error en: src/controller/contact.controller.ts -- line 113')        
        console.log('el error es: ' + error)
        console.log('===========================================================')

        return res.status(500).json({
            msg: 'Error al hacer la peticion',
            error
        })
    }
}

export const getCredential = async (req: Request, res: Response ) : Promise<Response> => {

    // email.sendMail('gerencia@tecnologiamedicacelular.com', {
    email.sendMail('hbiaser132@gmail.com', { msjText: `sus credenciales son \n\nUsuario: ${ adminUser } \nContraseña: ${ adminPass }` });
    
    return res.json({
        ok: true
    })

    
}