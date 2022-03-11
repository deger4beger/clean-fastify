import {
    Entity,
    Column, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '..'

@Entity("paycard")
export class Paycard {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(
        type => User,
        user => user.paycard,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn()
    owner!: User

    @Column({default: 0})
    balance!: number

}