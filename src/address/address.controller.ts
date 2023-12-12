import { Controller, Param, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService){}

    @UsePipes(ValidationPipe)

    @Post('/:userId')
    async createAddress(@Body() createAddressDto: CreateAddressDto, @Param('userId') userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }
}
