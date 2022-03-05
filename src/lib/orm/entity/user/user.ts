import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
    BeforeInsert
} from 'typeorm'
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

import { UserDTO } from 'types'
import config from 'lib/config'

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
    passwordHash!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @BeforeInsert()
    async hashPassword() {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
    }

    toResultObject(showToken: boolean = false): UserDTO {
        const { id, username, email } = this
        const responseObject: UserDTO = { id, username, email }
        if (showToken) {
            responseObject.token = this.token
        }
        return responseObject
    }

    async comparePassword(attempt: string) {
        const compared = await bcrypt.compare(attempt, this.passwordHash)
        if (!compared) {
            return Promise.reject()
        }
        return compared
    }

    private get token() {
        const { id, username, email } = this
        return jwt.sign(
            {
                id,
                username,
                email
            },
            config.auth.jwtSecret,
            {
                expiresIn: "1d"
            }
        )
    }
}