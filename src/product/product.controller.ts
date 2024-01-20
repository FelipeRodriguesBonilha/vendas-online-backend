import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userType.enum';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dtos/updateProduct.dto';

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

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
        return this.productService.createProduct(createProductDto);
    }
    
    @Roles(UserType.Admin)
    @Delete('/:productId')
    async deleteProduct(@Param('productId') productId: number): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put('/:productId')
    async updateProduct(@Body() updateProduct: UpdateProductDto, @Param('productId') productId: number): Promise<ProductEntity> {
        return this.productService.updateProduct(updateProduct, productId);
    }
}
