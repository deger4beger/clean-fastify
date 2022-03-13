import {
    Entity,
    Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '..';

@Entity("bill")
export class Bill {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    cost!: number

    @Column({default: false})
    isArchived!: boolean

    @ManyToOne(type => User)
    @JoinColumn()
    owner!: User

}