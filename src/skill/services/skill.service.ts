import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from '../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSkillDto, UpdateSkillDto } from '../dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
  ) {}

  public async findAll(): Promise<SkillEntity[]> {
    try {
      return await this.skillRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async create(body: CreateSkillDto): Promise<SkillEntity> {
    try {
      const skillExists = await this.skillRepository.findOneBy({
        name: body.name,
      });

      if (skillExists) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: `The skill ${body.name} already exists`,
        });
      }

      const newSkill = this.skillRepository.create(body);
      return this.skillRepository.save(newSkill);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async update(body: UpdateSkillDto): Promise<SkillEntity> {
    try {
      const skillExists = await this.skillRepository
        .createQueryBuilder('skill')
        .where({ id: body.id })
        .getOne();

      if (!skillExists) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Skill not found',
        });
      }

      const result: UpdateResult = await this.skillRepository
        .createQueryBuilder('skill')
        .update(SkillEntity)
        .set({ name: body.name })
        .where({ id: body.id })
        .execute();

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'Something went wrong, try it later',
        });
      }

      return await this.skillRepository
        .createQueryBuilder('skill')
        .where({ id: body.id })
        .getOne();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async delete(id: number): Promise<SkillEntity> {
    try {
      const skillExists = await this.skillRepository
        .createQueryBuilder('skill')
        .where({ id })
        .getOne();

      if (!skillExists) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Skill not found :(',
        });
      }

      const result: DeleteResult = await this.skillRepository.delete(id);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'Something went wrong, try it later',
        });
      }

      return skillExists;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
