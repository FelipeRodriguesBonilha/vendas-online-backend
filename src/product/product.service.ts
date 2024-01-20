import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ) {}

    async findAllProducts(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: {
                category: true,
            }
        });

        if(!products || products.length === 0){
            throw new NotFoundException('Products empty');
        }

        return products;
    }

    async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>{
        await this.categoryService.findCategoryById(createProductDto.categoryId);

        return this.productRepository.save(createProductDto);
    }
}
