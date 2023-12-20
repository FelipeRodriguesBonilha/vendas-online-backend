import { Controller, Param, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserType } from 'src/user/enum/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService){}

    @UsePipes(ValidationPipe)

    @Roles(UserType.Admin)
    @Post('/:userId')
    async createAddress(@Body() createAddressDto: CreateAddressDto, @Param('userId') userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }
}
