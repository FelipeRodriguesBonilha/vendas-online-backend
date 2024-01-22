import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userType.enum';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDto } from './dtos/insertCart.dto';
import { UserId } from 'src/decorators/userId.decorator';
import { CartService } from './cart.service';

@Roles(UserType.User)
@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService;
    ){}

    @UsePipes(ValidationPipe)
    @Post()
    async insertCart(@Body() insertCartDto: InsertCartDto, @UserId() userId: number): Promise<CartEntity>{
        return this.cartService.insertCart(insertCartDto, userId);
    }
}
