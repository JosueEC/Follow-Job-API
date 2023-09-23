import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from './entities/occupation.entity';
import { OccupationController } from './controllers/occupation.controller';
import { OccupationService } from './services/occupation.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Occupation]), UserModule],
  controllers: [OccupationController],
  providers: [OccupationService],
  exports: [],
})
export class OccupationModule {}
