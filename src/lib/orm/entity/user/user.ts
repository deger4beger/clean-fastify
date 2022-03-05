import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm'
import { UserDTO } from 'types'

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

    toResultsUser(): UserDTO {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
        }
    }
}