import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities';
import { SkillController } from './controllers/skill.controller';
import { SkillService } from './services/skill.service';
import { OccupationsSkillsEntity } from 'src/occupation/entities/occupations-skills.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity, OccupationsSkillsEntity])],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
