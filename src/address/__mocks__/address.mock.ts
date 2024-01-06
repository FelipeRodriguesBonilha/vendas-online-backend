import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";

export const addressMock: AddressEntity = {
    id: 32454,
    userId: 7,
    cep: '643367547',
    complement: 'casa 17',
    numberAddress: 20,
    cityId: cityMock.id,
    createdAt: new Date(),
    updatedAt: new Date()
}