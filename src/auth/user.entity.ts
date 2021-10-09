import { PrimeTime } from 'src/primetime/dto/primetime.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(_type => PrimeTime, (primetime) => primetime.user, { eager: true } )
    primetimes: PrimeTime[];
}