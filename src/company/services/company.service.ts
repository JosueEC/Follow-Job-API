import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { NetworkService } from 'src/network/services/network.service';
import { RelatesCompanyDto } from '../dto/relates-company.dto';
import { NetworkEntity } from 'src/network/entities/network.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly networkService: NetworkService,
  ) {}

  public async insert(body: CreateCompanyDto): Promise<InsertResult> {
    try {
      return await this.companyRepository.insert(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateRelations(
    body: RelatesCompanyDto,
  ): Promise<CompanyEntity> {
    try {
      const company = await this.findOne(body.companyId);
      const networks: NetworkEntity[] = this.networkService.bulkCreate(
        body.networks,
      );

      company.networks = networks;
      await this.companyRepository.save(company);

      return await this.companyRepository
        .createQueryBuilder('company')
        .leftJoin('company.networks', 'networks')
        .addSelect(['networks.name', 'networks.url'])
        .where('company.id = :companyId', { companyId: company.id })
        .getOne();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(companyId: string): Promise<CompanyEntity> {
    try {
      const company = await this.companyRepository
        .createQueryBuilder('company')
        .where('company.id = :companyId', { companyId })
        .getOne();

      if (!company) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Company not found',
        });
      }

      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOrSave(name: string): Promise<CompanyEntity> {
    try {
      const company = await this.companyRepository
        .createQueryBuilder('company')
        .where('company.name = :companyName', { companyName: name })
        .getOne();

      if (company) {
        return company;
      }

      return await this.companyRepository.save({
        name,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async delete(companyId: string): Promise<DeleteResult> {
    try {
      const result = await this.companyRepository.delete(companyId);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'Something went wrong when I try to delete the company',
        });
      }

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
