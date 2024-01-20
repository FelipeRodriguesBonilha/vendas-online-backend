import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dtos/createProduct.dto";

export const createProductMock: CreateProductDto = {
    name: 'createProductName',
    categoryId: categoryMock.id,
    price: 87.97,
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
}