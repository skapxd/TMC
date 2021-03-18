import "reflect-metadata";

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import hbs from 'hbs';
import router from './router/router';

import {createConnection} from 'typeorm';

const port =  process.env.PORT || 3000;

const app = express();

// createConnection()
//     .then(() => console.log('Connection success'))
//     .catch( err => console.log('Connection err: ', err)); 


// Handlerbars
app.set('view engine', 'hbs');
// hbs.registerPartials( __dirname + '/views/partials');
// 
hbs.registerPartials( __dirname + '/views/partials', );
 
// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Static content
app.use( express.static( 'public' ) );

// routes 
app.use(router)

app.listen(port, () => {
    console.log(`Server at http://localhost:${ port }`)
})