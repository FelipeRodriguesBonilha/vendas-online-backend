import { CartProductEntity } from "src/cart-product/entities/cartProduct.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'product'})
export class ProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'category_id', nullable: false})
    categoryId: number;

    @Column({name: 'price', nullable: false})
    price: number;

    @Column({name: 'image', nullable: false})
    image: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => CartProductEntity, (cartProductEntity) => cartProductEntity.product)
    cartProduct?: CartProductEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
    category?: CategoryEntity;
}