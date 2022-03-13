import {
    Entity,
    Column, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'

@Entity("bill")
@TableInheritance({ column: { type: "varchar", name: "archive" } })
export class Bill {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    cost!: number

}

export * from "./childs"