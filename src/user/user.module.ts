import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsEmailNotRegisteredConstraint } from './dto/custom-validators/is-email-not-registered';
import { UserFiltersService } from './userFilters.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserFiltersService, IsEmailNotRegisteredConstraint],
  exports: [UserService],
})
export class UserModule {}
