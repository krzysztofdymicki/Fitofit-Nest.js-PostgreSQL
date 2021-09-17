import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): string {
    return 'Fitofit app created by Krzysztof Dymicki';
  }
}
