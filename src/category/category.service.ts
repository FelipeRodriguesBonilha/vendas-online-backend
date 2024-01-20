import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if(!categories || categories.length === 0){
            throw new NotFoundException('Categories empty')
        }

        return categories;
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name,
            }
        })

        if(!category){
            throw new NotFoundException(`Category name: '${name}' not found`);
        }

        return category;
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(createCategoryDto.name).catch(() => undefined)

        if(category){
            throw new BadRequestException(`Category name: '${createCategoryDto.name}' already exist`)
        }

        return this.categoryRepository.save(createCategoryDto);
    }

    async findCategoryById(categoryId: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }    
        })

        if(!category){
            throw new NotFoundException(`Category id: '${categoryId}' not found`)
        }

        return category;
    }
}
