import { ReturnCategoryDto } from "../../category/dtos/returnCategory.dto"
import { ProductEntity } from "../entities/product.entity"

export class ReturnProductDto {
    id: number;
    name: string;
    price: number;
    image: string;
    category: ReturnCategoryDto;

    constructor(product: ProductEntity) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.category = product.category ? new ReturnCategoryDto(product.category) : undefined;
    }
}