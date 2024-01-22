import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDto } from './dtos/insertCart.dto';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
    ){}

    //verifica se o usuário tem carrinho ativo
    async verifyActiveCart(userId: number): Promise<CartEntity> { 
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true,
            }
        })

        if(!cart){
            throw new NotFoundException(`Cart active not found`);
        }

        return cart;
    }

    async createCart(userId: number): Promise<CartEntity> {
        return this.cartRepository.save({
            userId,
            active: true
        })
    }

    //insere no carrinho
    async insertCart(insertCartDto: InsertCartDto, userId: number): Promise<CartEntity> {
        const cart = await this.verifyActiveCart(userId).catch(async () => {return this.createCart(userId)});

        return cart;
    }

}
