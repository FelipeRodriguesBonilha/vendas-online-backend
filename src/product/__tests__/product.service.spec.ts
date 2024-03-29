import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { returnDeleteMock } from '../../__mocks__/returnDelete.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService,
      {
        provide: CategoryService,
        useValue: {
          findCategoryById: jest.fn().mockResolvedValue(categoryMock),
        }
      },
      {
        provide: getRepositoryToken(ProductEntity),
        useValue: {
          find: jest.fn().mockResolvedValue([productMock]),
          findOne: jest.fn().mockResolvedValue(productMock),
          save: jest.fn().mockResolvedValue(productMock),
          delete: jest.fn().mockResolvedValue(returnDeleteMock),
        }
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  //findallproducts
  it('should return list with all products', async () => {
    const products = await service.findAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error in list products if empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return error in list product exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  //createproduct
  it('should return product after save in DB', async () => {
    const product = await service.createProduct(createProductMock);

    expect(product).toEqual(productMock)
  });

  it('should return error exception in createProduct, category id not found', async () => {
    jest.spyOn(categoryService, 'findCategoryById').mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrowError()
  });

  //deleteproduct
  it('should return product in findProductById', async () => {
    const product = await service.findProductById(productMock.id);

    expect(product).toEqual(productMock)
  });

  it('should return error in product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return deleted true in deleteProduct', async () => {
    const deleted = await service.deleteProduct(productMock.id);

    expect(deleted).toEqual(returnDeleteMock);
  });

  //updateproduct
  it('should return product after update', async () => {
    const product = await service.updateProduct(updateProductMock, productMock.id);

    expect(product).toEqual(productMock);
  });

  it('should return error in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error())

    expect(service.updateProduct(updateProductMock, productMock.id)).rejects.toThrowError();
  });
});
