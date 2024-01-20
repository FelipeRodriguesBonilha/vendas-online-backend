import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userType.enum';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dtos/returnProduct.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ){}

    @Get()
    async findAllProducts(): Promise<ReturnProductDto[]> {
        return (await this.productService.findAllProducts()).map((product) => new ReturnProductDto(product));
    }
}
