import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { UserType } from 'src/user/enum/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService){}

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        return (await this.categoryService.findAllCategories()).map((category) => new ReturnCategoryDto(category));
    }
}
