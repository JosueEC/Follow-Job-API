import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { OccupationModule } from './occupation/occupation.module';
import { SkillModule } from './skill/skill.module';
import { DataSourceConfig } from './config/data.source';
import { ConfigModule } from '@nestjs/config';
import { NetworkModule } from './network/network.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UserModule,
    ProfileModule,
    OccupationModule,
    SkillModule,
    NetworkModule,
    VacancyModule,
    CompanyModule,
    JobModule,
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
