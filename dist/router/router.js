"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controller/contact.controller");
// Middleware
const validar_jwt_1 = require("../middleware/validar-jwt");
const router = express_1.Router();
router.get('/', contact_controller_1.getHome);
router.get('/gracias', contact_controller_1.getGracias);
router.post('/form', contact_controller_1.postForm);
router.get('/form', contact_controller_1.getForm);
// Envia token
router.post('/auth', contact_controller_1.postAuth);
router.get('/auth', contact_controller_1.getAuth);
// Recuperar credenciales
router.get('/recuperar-credenciales', contact_controller_1.getCredential);
router.get('/admin/:token', [validar_jwt_1.validarJWTViews], contact_controller_1.getAdmin);
exports.default = router;
