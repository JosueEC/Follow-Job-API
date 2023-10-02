import { Controller, Body, Post } from '@nestjs/common';
import { NetworkService } from '../services/network.service';
import { BulkCreateNetworkDto } from '../dto/bulk-create-network.dto';

@Controller('v1/network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Post()
  public async createNetwork(@Body() body: BulkCreateNetworkDto) {
    return await this.networkService.create(body);
  }
}
