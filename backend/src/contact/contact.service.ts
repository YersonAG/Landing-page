import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  create(data: any) {
    console.log(data);
    return { message: 'Contacto recibido correctamente' };
  }
}