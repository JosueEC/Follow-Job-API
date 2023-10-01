import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ISkill } from '../interfaces/skill.interface';
import { LevelSkill } from '../enums';

export class CreateSkillDto implements ISkill {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEnum(LevelSkill)
  level: LevelSkill = LevelSkill.BASIC;
}
