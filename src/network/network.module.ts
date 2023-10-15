import { Module } from '@nestjs/common';
import { NetworkController } from './controllers/network.controller';
import { NetworkService } from './services/network.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkEntity } from './entities/network.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([NetworkEntity]), ProfileModule],
  controllers: [NetworkController],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
