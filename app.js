require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3540;

// initialize express
const app = express();
app.use( express.json());

// Handlerbar
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials');

// Static content
app.use( express.static( 'public' ) );

app.get('/', (req, res) => {
    res.render('home', {});
    // res.send('hola mundo');

});

app.get('/gracias', (req, res) => {
    res.render('gracias', {});

});

app.post('/form', (req, res) => {


    const { email, telefono, nombre } =  req.body;


    res.status(200).json({
        ok: true,
        body: JSON.stringify( req.body )
    })
})

app.listen(port, () => console.log(`App running http://localhost:${port}`))