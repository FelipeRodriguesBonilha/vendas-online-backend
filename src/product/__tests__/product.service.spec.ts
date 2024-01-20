import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';

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
          save: jest.fn().mockResolvedValue(productMock),
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

  it('should return error in list products empty', async () => {
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
});
