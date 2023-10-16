import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from '../entities/job.entity';
import { InsertResult, Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { CreateJobDto } from '../dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  public async insert(body: CreateJobDto): Promise<InsertResult> {
    try {
      return await this.jobRepository.insert(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(jobId: string): Promise<JobEntity> {
    try {
      const job = await this.jobRepository
        .createQueryBuilder('job')
        .where('job.id = :jobId', { jobId })
        .getOne();

      if (!job) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Job not found',
        });
      }

      return job;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
