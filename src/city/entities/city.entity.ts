import { AddressEntity } from "src/address/entities/address.entity";
import { StateEntity } from "src/state/entities/state.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { ManyToOne, OneToMany, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";

@Entity({name: 'city'})
export class CityEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'state_id', nullable: false})
    stateId: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.city)
    addresses?: AddressEntity[];

    @ManyToOne(() => StateEntity, (state) => state.cities)
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    state?: StateEntity;
}
export {};