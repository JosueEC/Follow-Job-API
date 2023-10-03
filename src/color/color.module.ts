import { Module } from '@nestjs/common';
import { ColorController } from './controllers/color.controller';
import { ColorSerivce } from './services/color.service';

@Module({
  imports: [],
  controllers: [ColorController],
  providers: [ColorSerivce],
  exports: [],
})
export class ColorModule {}
