import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/userType.enum";

export const userEntityMock: UserEntity = {
    id: 4356,
    name: 'NameMock',
    cpf: '73264573546',
    email: 'emailmock@email.com',
    password: 'largepassword',
    phone: '19849385493',
    typeUser: UserType.User,
    createdAt: new Date(),
    updatedAt: new Date()
}