import {
    Entity,
    Column, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '..'

@Entity("profile")
export class Profile {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @OneToOne(
        type => User,
        user => user.profile,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn()
    owner!: User

    @Column({default: ""})
    avatarUrl!: string

}