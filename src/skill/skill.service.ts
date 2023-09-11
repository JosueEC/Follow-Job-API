import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  public async create(skill: CreateSkillDto): Promise<Skill> {
    const skillExists = await this.skillRepository.findOneBy({
      name: skill.name,
    });

    if (skillExists) {
      throw new ConflictException(`The skill ${skill.name} already exists`);
    }

    const newSkill = this.skillRepository.create(skill);
    return this.skillRepository.save(newSkill);
  }
}
