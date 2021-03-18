import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    nombre: string;

    @Column()
    fecha: string;
}