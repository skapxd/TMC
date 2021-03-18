"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credentials_1 = require("../credentials");
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        return jsonwebtoken_1.default.sign(payload, credentials_1.firmaJWT, { expiresIn: '4h' }, (err, token) => {
            if (err) {
                console.log('Ocurrio un error: ' + err);
                reject('No se puedo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
