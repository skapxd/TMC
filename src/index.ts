import "reflect-metadata";

import app from "./app";

import { createConnection } from './db/db';

createConnection();

app.listen(app.get('port'), () => {
    console.log(`Server at http://localhost:${ app.get('port') }`)
})

