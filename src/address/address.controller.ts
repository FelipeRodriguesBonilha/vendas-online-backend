import { Controller, Param, Post, Body, ValidationPipe, UsePipes, Get } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserType } from '../user/enum/userType.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/userId.decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService){}

    @UsePipes(ValidationPipe)

    @Post()
    async createAddress(@Body() createAddressDto: CreateAddressDto, @UserId() userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }

    @Get()
    async getAddressesByUserId(@UserId() userId: number): Promise<ReturnAddressDto[]> {
        return (await this.addressService.getAddressesByUserId(userId)).map((address) => new ReturnAddressDto(address));
    }
}
