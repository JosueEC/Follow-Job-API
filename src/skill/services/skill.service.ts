import {
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from '../entities';
import { Repository } from 'typeorm';
import { CreateSkillDto, UpdateSkillDto } from '../dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
  ) {}

  public async findAll(): Promise<SkillEntity[]> {
    return await this.skillRepository.find();
  }

  public async create(skill: CreateSkillDto): Promise<SkillEntity> {
    const skillExists = await this.skillRepository.findOneBy({
      name: skill.name,
    });

    if (skillExists) {
      throw new ConflictException(`The skill ${skill.name} already exists`);
    }

    const newSkill = this.skillRepository.create(skill);
    return this.skillRepository.save(newSkill);
  }

  public async update(skill: UpdateSkillDto): Promise<SkillEntity> {
    const skillExists = await this.skillRepository
      .createQueryBuilder('skill')
      .where({ id: skill.id })
      .getOne();

    if (!skillExists) {
      throw new NotFoundException('Skill not found :(');
    }

    await this.skillRepository
      .createQueryBuilder('skill')
      .update(SkillEntity)
      .set({ name: skill.name })
      .where({ id: skill.id })
      .execute();

    return await this.skillRepository
      .createQueryBuilder('skill')
      .where({ id: skill.id })
      .getOne();
  }

  public async delete(id: number): Promise<SkillEntity> {
    const skillExists = await this.skillRepository
      .createQueryBuilder('skill')
      .where({ id })
      .getOne();

    if (!skillExists) {
      throw new NotFoundException('Skill not found :(');
    }

    const result = await this.skillRepository.delete(id);

    if (result.affected === 0) {
      throw new ServiceUnavailableException(
        'Something went wrong, try it later',
      );
    }

    return skillExists;
  }
}
