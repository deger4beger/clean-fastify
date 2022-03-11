import config from 'lib/config'
import {
    Column,
    CreateDateColumn,
    Entity,
    Index, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
    BeforeInsert
} from 'typeorm'
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

import { UserDTO } from 'types'
import { Paycard } from '..';

@Entity("user")
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    username!: string

    @Index({ unique: true })
    @Column()
    email!: string

    @Column()
    password!: string

    @OneToOne(
        type => Paycard,
        paycard => paycard.owner,
        {
            cascade: true
        }
    )
    paycard!: Paycard

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    toResultObject(showToken: boolean = false): UserDTO {
        return {
            id: this.id,
            username: this.username,
            email: this.email
        }
    }

    async comparePassword(attempt: string) {
        const compared = await bcrypt.compare(attempt, this.password)
        if (!compared) {
            return Promise.reject()
        }
        return compared
    }
}