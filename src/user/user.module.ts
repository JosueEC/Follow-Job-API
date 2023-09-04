import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsEmailNotRegisteredConstraint } from './dto/custom-validators/is-email-not-registered';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, IsEmailNotRegisteredConstraint],
  exports: [],
})
export class UserModule {}
