import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities';
import { Repository } from 'typeorm';
import { CreateSkillDto, UpdateSkillDto } from './dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  public async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

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

  public async update(skill: UpdateSkillDto): Promise<Skill> {
    const skillExists = await this.skillRepository.findOneBy({ id: skill.id });

    if (!skillExists) {
      throw new NotFoundException('Skill not found :(');
    }

    await this.skillRepository.update(skill.id, skill);
    return await this.skillRepository.findOneBy({ id: skill.id });
  }
}
