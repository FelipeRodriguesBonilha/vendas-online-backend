import { Controller, Param, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserType } from '../user/enum/userType.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/userId.decorator';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService){}

    @UsePipes(ValidationPipe)

    @Roles(UserType.User)
    @Post()
    async createAddress(@Body() createAddressDto: CreateAddressDto, @UserId() userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }
}
