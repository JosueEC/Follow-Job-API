import { JobStatus } from '../enums/job-status.enum';

export interface IVacancy {
  postUrl: string;
  salary: string;
  description: string;
  status: JobStatus;
}
