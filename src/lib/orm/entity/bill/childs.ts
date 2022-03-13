import { ChildEntity, Entity,
    Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'

import { Bill } from '.';
import { User } from '..';

@ChildEntity()
export class BillArchivedInfo extends Bill {

    @Column({default: false})
    isArchived!: boolean

    @ManyToOne(type => User)
    @JoinColumn()
    paidBy!: User

}