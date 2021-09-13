import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PrimeTime {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    rank: number;

    //Not sure if this is correct
    @Column('simple-array', { nullable: true })
    subscriptions: string[];
}