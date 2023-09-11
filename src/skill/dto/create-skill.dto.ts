import { LevelSkill } from '../enums';

export class CreateSkillDto {
  id: string;
  name: string;
  level: LevelSkill;
}
