"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredential = exports.postAuth = exports.getAuth = exports.getAdmin = exports.getForm = exports.postForm = exports.getGracias = exports.getHome = void 0;
const moment_1 = __importDefault(require("moment"));
const Mail_1 = __importDefault(require("../mail/Mail"));
const generar_jwt_1 = require("../helper/generar-jwt");
const credentials_1 = require("../credentials");
const db_1 = require("../db/db");
const nanoid_1 = require("nanoid");
const email = new Mail_1.default();
const getHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.render('home-2.0.hbs', {});
});
exports.getHome = getHome;
const getGracias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.render('gracias', {});
});
exports.getGracias = getGracias;
const postForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fecha = moment_1.default().subtract(5, 'hours').format('YYYY[-]MM[-]DD HH:mm:ss');
        const contact = req.body;
        const newContact = {
            id: nanoid_1.nanoid(),
            nombre: contact.nombre,
            email: contact.email,
            telefono: contact.telefono,
            fecha,
        };
        console.log(newContact);
        // getConnection().get('contacts').push(newContact).write()
        email.sendMail('hbiaser132@gmail.com', 
        // email.sendMail('gerencia@tecnologiamedicacelular.com', 
        { msjText: `Tiene un nuevo registro de Tecnología Medíca Celular \n\nCorreo: ${contact.email}\nNombre: ${contact.nombre}\nTelefono: ${contact.telefono}\nFecha: ${fecha}` });
        return res.json(newContact);
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            error
        });
    }
});
exports.postForm = postForm;
const getForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = db_1.getConnection().get('contacts').values();
    console.log(contacts);
    return res.json(contacts);
});
exports.getForm = getForm;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.render('Admin');
});
exports.getAdmin = getAdmin;
const getAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.token);
    return res.render('auth', {});
});
exports.getAuth = getAuth;
const postAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pass } = req.body;
    try {
        const auth = {
            email: "admin@tmc.com",
            pass: "tmc123*"
        };
        // Verificar email
        if (email !== auth.email) {
            return res.status(400).json({
                msg: 'correo no valido ',
                pass: false
            });
        }
        // Verificar contraseña
        if (pass !== auth.pass) {
            return res.status(400).json({
                msg: 'Contraseña no valido',
                pass: false
            });
        }
        console.log(`uid desde controller ${req.body.uid}`);
        // Generar JWT
        const token = yield generar_jwt_1.generarJWT(auth.email);
        return res.json({
            // auth,
            token
        });
    }
    catch (error) {
        console.log('===========================================================');
        console.log('Hubo un error en: src/controller/contact.controller.ts -- line 113');
        console.log('el error es: ' + error);
        console.log('===========================================================');
        return res.status(500).json({
            msg: 'Error al hacer la peticion',
            error
        });
    }
});
exports.postAuth = postAuth;
const getCredential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // email.sendMail('hbiaser132@gmail.com', 
    email.sendMail('gerencia@tecnologiamedicacelular.com', { msjText: `sus credenciales son \n\nUsuario: ${credentials_1.adminUser} \nContraseña: ${credentials_1.adminPass}` });
    return res.json({
        ok: true
    });
});
exports.getCredential = getCredential;
