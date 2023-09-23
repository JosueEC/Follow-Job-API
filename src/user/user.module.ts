import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsEmailNotRegisteredConstraint } from './decorators/is-email-not-registered';
import { UserFiltersService } from './services/filters.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserFiltersService, IsEmailNotRegisteredConstraint],
  exports: [UserService],
})
export class UserModule {}
