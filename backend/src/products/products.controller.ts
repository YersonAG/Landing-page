import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards, UseInterceptors,
  UploadedFile, ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const storage = diskStorage({
  destination: './uploads',
  filename: (_, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + extname(file.originalname));
  },
});

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Ruta pública — la usa el frontend
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Rutas protegidas — solo admin
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const imageUrl = file ? `/uploads/${file.filename}` : null;
    return this.productsService.create({ ...body, imageUrl });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data: any = { ...body };
    if (file) data.imageUrl = `/uploads/${file.filename}`;
    return this.productsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}