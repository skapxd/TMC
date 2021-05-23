import { Router } from 'express';
import { getHome, getGracias, postForm, getForm, postAuth, getAdmin, getAuth, getCredential } from '../controller/contact.controller';

// Middleware
import { validarJWTViews } from '../middleware/validar-jwt';

const router = Router();

router.get('/', getHome);

router.get('/gracias', getGracias);

router.post('/form', postForm);

router.get('/form', getForm);

// Envia token
router.post('/auth',  postAuth);

router.get('/auth', getAuth);

// Recuperar credenciales
router.get('/recuperar-credenciales', getCredential)

router.get('/admin',[ validarJWTViews ], getAdmin);

export default router;