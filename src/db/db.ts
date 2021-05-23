import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileSync.js";

type Contact3 = {
    email: string;
    nombre: string;
    telefono: string;
    fecha: string;

}

type Schema = {
    tasks: Contact3[]
}

let db: lowdb.LowdbSync<Schema>;

export const createConnection = () => {

    const adapter = new FileAsync<Schema>('db.json')
    
    db =  lowdb(adapter);

    db.defaults({ contacts: [] })
        .write();

}

export const getConnection = () => db
