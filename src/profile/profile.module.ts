import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UserModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [],
})
export class ProfileModule {}
