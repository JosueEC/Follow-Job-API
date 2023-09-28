import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupationEntity } from './entities/occupation.entity';
import { OccupationController } from './controllers/occupation.controller';
import { OccupationService } from './services/occupation.service';
import { UserModule } from '../user/user.module';
import { OccupationsSkillsEntity } from './entities/occupations-skills.entity';
import { UsersOccupationsEntity } from 'src/user/entities/users-occupations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OccupationEntity,
      OccupationsSkillsEntity,
      UsersOccupationsEntity,
    ]),
    UserModule,
  ],
  controllers: [OccupationController],
  providers: [OccupationService],
  exports: [],
})
export class OccupationModule {}
