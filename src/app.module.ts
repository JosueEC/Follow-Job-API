import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { OccupationModule } from './occupation/occupation.module';
import { SkillModule } from './skill/skill.module';
import { DataSourceConfig } from './config/data.source';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
