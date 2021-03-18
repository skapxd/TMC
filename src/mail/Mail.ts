import nodemailer from 'nodemailer'
import {passMail, userMail} from '../credentials';

export default class Mail {

    async sendMail( email: string, options: {msjHtml?: string, msjText?: string}  ): Promise<void> {
        
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: userMail,
                pass: passMail
            }
        });
    
        transporter.verify().then( () => {
                console.log('ready for send email')
        });
    
        await transporter.sendMail({
            from: 'automail.noresponder@gmail.com',
            to: email,
            html: options.msjHtml,
            text:options.msjText,
            subject: 'No responder a este email'
        });
    }
}