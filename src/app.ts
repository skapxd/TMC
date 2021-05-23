import express from "express";
import cors from 'cors'
import  morgan from 'morgan'

import hbs from 'hbs';
import router from './router/router';

const app = express();

app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Static content
app.use( express.static( 'public' ) );


// Handlerbars
app.set('view engine', 'hbs');
// hbs.registerPartials( __dirname + '/views/partials');
// 
hbs.registerPartials( __dirname + '/views/partials', );


// routes 
app.use(router)

export default app; 

