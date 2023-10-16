import { Module } from '@nestjs/common';
import { VacancyController } from './controllers/vacancy.controller';
import { VacancyService } from './services/vacancy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyEntity } from './entities/vacancy.entity';
import { CompanyModule } from 'src/company/company.module';
import { JobModule } from 'src/job/job.module';
import { LocationModule } from 'src/location/location.module';
import { ColorModule } from 'src/color/color.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VacancyEntity]),
    CompanyModule,
    JobModule,
    LocationModule,
    ColorModule,
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [],
})
export class VacancyModule {}
