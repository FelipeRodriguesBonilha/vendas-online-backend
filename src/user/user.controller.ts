import { Controller, Post, Get, Body, UsePipes, ValidationPipe, Param, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { UserId } from 'src/decorators/userId.decorator';
import { UserType } from './enum/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {  
        return this.userService.createUser(createUser);
    }

    @Roles(UserType.Admin)
    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDto(userEntity));
    }

    @Roles(UserType.Admin)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
        return new ReturnUserDto(await this.userService.findUserByIdUsingRelations(userId));
    }

    @Roles(UserType.Admin, UserType.User)
    @UsePipes(ValidationPipe)
    @Patch()
    async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @UserId() userId: number): Promise<UserEntity> {
        return this.userService.updatePassword(updatePasswordDto, userId);
    }
}
