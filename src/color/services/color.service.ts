import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from '../entities/color.entity';
import { InsertResult, Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { CreateColorDto } from '../dto/create-color.dto';

@Injectable()
export class ColorSerivce {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  public async insertOne(body: CreateColorDto): Promise<InsertResult> {
    try {
      return await this.colorRepository.insert(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(colorId: string): Promise<ColorEntity> {
    try {
      const color = await this.colorRepository
        .createQueryBuilder('color')
        .where('color.id = :colorId', { colorId })
        .getOne();

      if (!color) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Color not found',
        });
      }

      return color;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
