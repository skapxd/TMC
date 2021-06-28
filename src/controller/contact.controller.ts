import { Handler } from 'express'
import moment from 'moment';
import Mail from '../mail/Mail';
import { generarJWT } from '../helper/generar-jwt';
import { adminPass, adminUser } from '../credentials';
import { getConnection } from "../db/db";
import { nanoid } from "nanoid";

interface Contact2 {
    id?: string;
    email: string;
    telefono: string;
    nombre: string; 
    fecha: string;
}

const email = new Mail();


export const getHome: Handler = async ( req, res) => {

    return res.render('home-2.0.hbs', {});
} 

export const getGracias: Handler = async ( req, res )  => {
    
    return res.render('gracias', {});
}

export const postForm: Handler = async ( req, res)  => {

    try {
        let fecha = moment().subtract(5, 'hours').format('YYYY[-]MM[-]DD HH:mm:ss');
        
        const contact: Contact2 = req.body

        
        
        const newContact = {
            id: nanoid(),
            nombre: contact.nombre,
            email: contact.email,
            telefono: contact.telefono,
            fecha,
        }
        
        console.log(newContact);

        // getConnection().get('contacts').push(newContact).write()

        email.sendMail('hbiaser132@gmail.com', 
        // email.sendMail('gerencia@tecnologiamedicacelular.com', 
            { msjText: `Tiene un nuevo registro de Tecnología Medíca Celular \n\nCorreo: ${ contact.email }\nNombre: ${ contact.nombre }\nTelefono: ${ contact.telefono }\nFecha: ${ fecha }` });


        return res.json(newContact);
        

    } catch (error) {

        return res.status(404).json({
            success: false,
            error
        })
        
    }
}

export const getForm: Handler = async ( req, res)  => {


    const contacts = getConnection().get('contacts').values();
    console.log(contacts);

    return res.json(contacts);
}

export const getAdmin: Handler = async ( req, res )  => {
    
    return res.render('Admin',  ) 
}

export const getAuth: Handler = async ( req, res )  => {

    console.log(req.params.token)

    return res.render('auth', {})
}

export const postAuth: Handler = async ( req, res )  => {

    const { email, pass } = req.body;

    try {
        
        interface Admin {
            email: string
            pass: string
        }

        const auth: Admin = { 
            email: "admin@tmc.com",
            pass: "tmc123*"
        }  
        // Verificar email
        if (email !== auth.email) {
            
            return res.status(400).json({
                msg: 'correo no valido ',
                pass: false
            })
        }

        // Verificar contraseña
        if ( pass !== auth.pass) {
            return res.status(400).json({
                msg: 'Contraseña no valido',
                pass: false
            })
        }


        console.log(`uid desde controller ${req.body.uid}`)

        // Generar JWT
        const token = await generarJWT( auth.email );

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

export const getCredential: Handler = async (req, res )  => {

    // email.sendMail('hbiaser132@gmail.com', 
    email.sendMail('gerencia@tecnologiamedicacelular.com', 

        { msjText: `sus credenciales son \n\nUsuario: ${ adminUser } \nContraseña: ${ adminPass }` });
    
    return res.json({
        ok: true
    })

    
}
