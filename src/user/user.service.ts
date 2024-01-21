import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const user = await this.findUserByEmail(createUserDto.email).catch(() => undefined);

        if(user){
            throw new BadRequestException('Email already registered')
        }

        const saltOrRounds = 10;

        const passwordHashed = await createPasswordHashed(createUserDto.password)
        
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed,
        })
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!user) {
            throw new NotFoundException(`UserId: ${userId} Not Found`);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });

        if(!user) {
            throw new NotFoundException(`Email: ${email} Not Found`);
        }

        return user;
    }

    async findUserByIdUsingRelations(userId: number): Promise<UserEntity>{
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                addresses: {
                    city: {
                        state: true
                    }
                }
            },
        });
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto, userId: number): Promise<UserEntity> {
        const user = await this.findUserById(userId);

        const isMatch = await validatePassword(updatePasswordDto.lastPassword, user.password || '');

        if(!isMatch){
            throw new BadRequestException('Last password invalid');
        }
        
        const passwordHashed = await createPasswordHashed(updatePasswordDto.newPassword);

        return this.userRepository.save({
            ...user,
            password: passwordHashed
        })
    }
}