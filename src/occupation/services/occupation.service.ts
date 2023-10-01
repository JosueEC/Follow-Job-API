import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OccupationEntity } from '../entities/occupation.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { ErrorManager } from '../../utils/error.manager';
import { OccupationsSkillsEntity } from '../entities/occupations-skills.entity';
import { UsersOccupationsEntity } from 'src/user/entities/users-occupations.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { SkillService } from 'src/skill/services/skill.service';
import { CreateOccupationSkillDto } from '../dto/create-occupation-skill.dto';

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(OccupationEntity)
    private readonly occupationRepository: Repository<OccupationEntity>,
    @InjectRepository(OccupationsSkillsEntity)
    private readonly occupationSkillRepository: Repository<OccupationsSkillsEntity>,
    @InjectRepository(UsersOccupationsEntity)
    private readonly userOccupationsRepository: Repository<UsersOccupationsEntity>,
    private readonly userService: UserService,
    private readonly skillService: SkillService,
  ) {}

  public async create(
    userId: string,
    body: CreateOccupationSkillDto,
  ): Promise<UserEntity> {
    try {
      const user = await this.userService.findOne(userId);
      const occupation = await this.occupationRepository.save(body.occupation);
      const skills = body.skills;

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      await this.userOccupationsRepository.save({
        user,
        occupation,
        monthsExperience: body.occupation.monthsExperience,
        yearsExperience: body.occupation.yearsExperience,
      });

      skills.forEach(async (skill, index) => {
        return await this.skillService
          .findOrSave(skill)
          .then(async (response) => {
            await this.occupationSkillRepository.save({
              level: skills[index].level,
              occupation,
              skill: response,
            });
          });
      });

      return this.userService.findOne(userId);
    } catch (error) {
      console.info(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(): Promise<OccupationEntity[]> {
    try {
      return await this.occupationRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
