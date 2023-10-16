import { Module } from '@nestjs/common';
import { ColorController } from './controllers/color.controller';
import { ColorSerivce } from './services/color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorController],
  providers: [ColorSerivce],
  exports: [ColorSerivce],
})
export class ColorModule {}
