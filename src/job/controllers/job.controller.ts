import { Controller, Body, Post } from '@nestjs/common';
import { JobService } from '../services/job.service';
import { InsertResult } from 'typeorm';
import { CreateJobDto } from '../dto/create-job.dto';

@Controller('v1/job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  public async insertOneJob(@Body() body: CreateJobDto): Promise<InsertResult> {
    return this.jobService.insert(body);
  }
}
