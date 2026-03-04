import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards, UseInterceptors,
  UploadedFile, ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

async function uploadToCloudinary(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: 'luisaoparfums' },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    Readable.from(file.buffer).pipe(upload);
  });
}

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    cloudinary.config({                                    // ← movido aquí
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    let imageUrl: string | null = null;
    if (file) imageUrl = await uploadToCloudinary(file);
    return this.productsService.create({ ...body, imageUrl });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data: any = { ...body };
    if (file) data.imageUrl = await uploadToCloudinary(file);
    return this.productsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}