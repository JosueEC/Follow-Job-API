import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetworkEntity } from '../entities/network.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { BulkCreateNetworkDto } from '../dto/bulk-create-network.dto';
import { SocialNetwork } from '../enums/social-network.enum';
import { ProfileService } from 'src/profile/services/profile.service';
import { ProfileEntity } from 'src/profile/entities/profile.entity';

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(NetworkEntity)
    private readonly networkRepository: Repository<NetworkEntity>,
    private readonly profileService: ProfileService,
  ) {}

  public async create(body: BulkCreateNetworkDto): Promise<ProfileEntity> {
    try {
      const profile = await this.profileService.findOne(body.profileId);

      if (!profile) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Profile not found :(',
        });
      }

      const networksCreated: NetworkEntity[] = [...body.networks].map(
        (network) => {
          return this.networkRepository.create({
            name: SocialNetwork[network.name],
            url: network.url,
          });
        },
      );

      profile.networks = networksCreated;
      await this.profileService.save(profile);

      return await this.profileService.findOne(profile.id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
