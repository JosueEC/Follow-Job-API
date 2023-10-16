import { Controller, Body, Post } from '@nestjs/common';
import { ColorSerivce } from '../services/color.service';
import { InsertResult } from 'typeorm';
import { CreateColorDto } from '../dto/create-color.dto';

@Controller('v1/color')
export class ColorController {
  constructor(private readonly colorService: ColorSerivce) {}

  @Post()
  public async insertOneColor(
    @Body() body: CreateColorDto,
  ): Promise<InsertResult> {
    return this.colorService.insertOne(body);
  }
}
