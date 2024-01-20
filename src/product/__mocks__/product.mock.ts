import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    id: 893238,
    name: 'productName',
    categoryId: categoryMock.id,
    price: 82.99,
    image: 'https://image.com',
    createdAt: new Date(),
    updatedAt: new Date()
}