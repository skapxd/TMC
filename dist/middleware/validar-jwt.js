"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWTViews = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credentials_1 = require("../credentials");
const validarJWTViews = (req, res, next) => {
    // const token = req.header('x-token');
    const token = req.params.token;
    console.log(token);
    if (!token) {
        return res.redirect('/auth');
        // return res.status(401).json({
        //     msg: 'No hay token en la peticion'
        // })
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, credentials_1.firmaJWT);
        req.body.uid = payload.uid;
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
