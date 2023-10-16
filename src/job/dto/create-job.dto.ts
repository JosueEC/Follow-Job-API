import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IJob } from '../interfaces/job.interface';

export class CreateJobDto implements IJob {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}
