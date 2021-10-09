import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PrimeTime {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    rank: number;

    @Column({

        type: 'jsonb',
        array: false,
    })
    shared?: string[];

    //Not sure if this is correct
    @Column({
        type: 'jsonb',
        array: false,
    })
    subscriptions?: object[];

    @Column({
        type: 'jsonb',
        array: false,
    })
    tags?: string[];

    @ManyToOne((_type) => User, (user) => user.primetimes, { eager: false})
    @Exclude({ toPlainOnly: true })
    user: User;
}