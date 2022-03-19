import { CreateDateColumn, Entity,
    Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '..';

@Entity("message")
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({
        default: "common"
    })
    dialogId!: string

    @ManyToOne(type => User)
    @JoinColumn()
    sender!: User

    @ManyToOne(type => User)
    @JoinColumn()
    reciever!: User

    @Column({ type: "text" })
    content!: string

    @CreateDateColumn()
    createdAt!: Date

    toResultObject() {
        const { dialogId, ...resultObject } = this
        return resultObject
    }

}