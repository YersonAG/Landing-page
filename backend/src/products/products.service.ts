import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Product>) {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: number, data: Partial<Product>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException();
    return this.repo.remove(product);
  }
}