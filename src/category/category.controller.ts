import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { UserType } from 'src/user/enum/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService){}

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        return (await this.categoryService.findAllCategories()).map((category) => new ReturnCategoryDto(category));
    }

    @UsePipes(ValidationPipe)
    @Roles(UserType.Admin)
    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategoryDto);
    }
}
