import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ColorModule } from './color/color.module';
import { CustomMiddleware } from './middlewares/custom-middleware.middleware';

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
    ColorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // Esta es la forma en la que inyectamos middlewares a las rutas.
  // La clase del modulo debe de extender de la clase NestModule para
  // poder acceder al metodo configure, el cual nos permite inyectar
  // los middlewares en las rutas que le especifiquemos
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomMiddleware).forRoutes('marketer-bot');
  }
}
