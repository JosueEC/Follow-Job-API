import { Controller, Body, Post, Get, Patch } from '@nestjs/common';
import { CreateSkillDto, UpdateSkillDto } from './dto';
import { SkillService } from './skill.service';
import { Skill } from './entities';

@Controller('v1/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  public async createSkill(@Body() skill: CreateSkillDto): Promise<Skill> {
    return await this.skillService.create(skill);
  }

  @Get()
  public async getAllSkills(): Promise<Skill[]> {
    return await this.skillService.findAll();
  }

  @Patch()
  public async updateOneSkill(
    @Body()
    skill: UpdateSkillDto,
  ): Promise<Skill> {
    return await this.skillService.update(skill);
  }
}
