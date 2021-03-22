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
const typeorm_1 = require("typeorm");
const Contact_1 = require("../entity/Contact");
const Mail_1 = __importDefault(require("../mail/Mail"));
const Admin_1 = require("../entity/Admin");
const generar_jwt_1 = require("../helper/generar-jwt");
const credentials_1 = require("../credentials");
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
        let body = req.body;
        let fecha = moment_1.default().subtract(5, 'hours').format('YYYY[-]MM[-]DD HH:mm:ss');
        body['fecha'] = fecha;
        const newContact = typeorm_1.getRepository(Contact_1.Contact).create(body);
        const result = yield typeorm_1.getRepository(Contact_1.Contact).save(newContact);
        // email.sendMail('gerencia@tecnologiamedicacelular.com', {
        email.sendMail('gerencia@tecnologiamedicacelular.com', { msjText: `Tiene un nuevo registro de Tecnología Medíca Celular \n\nCorreo: ${body.email}\nNombre: ${body.nombre}\nTelefono: ${body.telefono}\nFecha: ${body.fecha}` });
        return res.status(200).json({
            res: result
        });
    }
    catch (err) {
        console.log(`el error es: ${err}`);
        return res.status(200).json({
            res: 'Ocurrio un errorn el controlador',
            err
        });
    }
});
exports.postForm = postForm;
const getForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield typeorm_1.getRepository(Contact_1.Contact).find();
    return res.json(contacts);
});
exports.getForm = getForm;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = (yield typeorm_1.getRepository(Contact_1.Contact).find()).reverse();
    return res.render('Admin', {
        contacts
    });
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
        // Verificar si el email existe
        const auth = yield typeorm_1.getRepository(Admin_1.Admin).findOne({ email });
        console.log(auth);
        if (!auth) {
            return res.status(400).json({
                msg: 'Usuario no valido',
                usuario: false
            });
        }
        // Si el usuario esta activo
        // Verificar contraseña
        if (pass !== auth.pass) {
            return res.status(400).json({
                msg: 'Contraseña no valido',
                pass: false
            });
        }
        console.log(`uid desde controller ${req.body.uid}`);
        // Generar JWT
        const token = yield generar_jwt_1.generarJWT(auth.id);
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
    // email.sendMail('gerencia@tecnologiamedicacelular.com', {
    email.sendMail('hbiaser132@gmail.com', { msjText: `sus credenciales son \n\nUsuario: ${credentials_1.adminUser} \nContraseña: ${credentials_1.adminPass}` });
    return res.json({
        ok: true
    });
});
exports.getCredential = getCredential;
