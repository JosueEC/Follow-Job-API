import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
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

  @Delete(':id')
  @HttpCode(204)
  public async deleteOneSkill(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Skill> {
    return await this.skillService.delete(id);
  }
}
