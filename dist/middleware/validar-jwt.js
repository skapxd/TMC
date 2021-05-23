"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWTViews = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credentials_1 = require("../credentials");
const validarJWTViews = (req, res, next) => {
    var _a;
    const cookie = ((_a = req.header('cookie')) === null || _a === void 0 ? void 0 : _a.split(';')) || [];
    let token = '';
    // recorre la lista de cookies
    for (const item of cookie) {
        // busca en las cookies si hay un string que coincida con token
        if (item.indexOf('token') !== -1) {
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
    if (!token) {
        return res.redirect('/auth');
        // return res.status(401).json({
        //     msg: 'No hay token en la peticion'
        // })
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, credentials_1.firmaJWT);
        req.body.email = payload.email;
        // console.log( payload );
        next();
    }
    catch (error) {
        console.log('===========================================================');
        console.log('Hubo un error en: src/middleware/validar-jwt.ts line -- 30');
        console.log('el error es: ' + error);
        console.log('===========================================================');
        // return res.redirect('/auth')
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};
exports.validarJWTViews = validarJWTViews;
