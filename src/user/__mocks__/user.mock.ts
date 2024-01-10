import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/userType.enum";

export const userEntityMock: UserEntity = {
    id: 4356,
    name: 'NameMock',
    cpf: '73264573546',
    email: 'emailmock@email.com',
    password: '$2b$10$QApvkmBcLP4VyxQyoQ2EFem/hFCbbvWJ7GFawdkleVm9gCY5uCVCS',
    phone: '19849385493',
    typeUser: UserType.User,
    createdAt: new Date(),
    updatedAt: new Date()
}