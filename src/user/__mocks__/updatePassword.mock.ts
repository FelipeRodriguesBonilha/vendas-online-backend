import { UpdatePasswordDto } from "../dtos/updatePassword.dto";

export const updatePasswordMock: UpdatePasswordDto = {
    lastPassword: 'fefe',
    newPassword: 'felipe'
}

export const updatePasswordInvalidMock: UpdatePasswordDto = {
    lastPassword: 'fefeinvalid',
    newPassword: 'felipe'
}