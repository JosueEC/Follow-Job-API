import { Module } from '@nestjs/common';
import { VacancyController } from './controllers/vacancy.controller';
import { VacancyService } from './services/vacancy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyEntity } from './entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyEntity])],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [],
})
export class VacancyModule {}
