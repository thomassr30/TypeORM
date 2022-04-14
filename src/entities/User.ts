import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm' 

@Entity()
export class User extends BaseEntity {

@PrimaryGeneratedColumn()
id: number

@Column()
firstname: string

@Column()
lastname: string

@Column({
    default: true
})
active: boolean

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updatedAd: Date

}