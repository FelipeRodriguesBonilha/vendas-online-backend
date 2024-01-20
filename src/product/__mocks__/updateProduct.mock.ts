import { categoryMock } from "../../category/__mocks__/category.mock";
import { UpdateProductDto } from "../dtos/updateProduct.dto";

export const updateProductMock: UpdateProductDto = {
    name: 'updateProductName',
    categoryId: categoryMock.id,
    price: 87.97,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw1VbCPB9DjInz0BKNXgj134&ust=1705878243535000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCOjUuPGJ7YMDFQAAAAAdAAAAABAE'
}