import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ){}

    async createAddress(createAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity>{
        const user = await this.userService.findUserById(userId);
        const city = await this.cityService.findCityById(createAddressDto.cityId);

        return this.addressRepository.save({
            ...createAddressDto,
            userId
        });
    }

    async getAddressesByUserId(userId: number): Promise<AddressEntity[]> {
        const addresses = await this.addressRepository.find({
            where: {
                userId
            },
            relations: {
                city: {
                    state: true,
                }
            },
        })

        if(!addresses || addresses.length === 0){
            throw new NotFoundException(`Address not found for userId: ${userId}`);
        }

        return addresses;
    }
}
