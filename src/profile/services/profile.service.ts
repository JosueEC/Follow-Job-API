import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { UserService } from '../../user/services/user.service';
import { ErrorManager } from '../../utils/error.manager';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly userService: UserService,
  ) {}

  public async create(
    userId: string,
    body: CreateProfileDto,
  ): Promise<UserEntity> {
    try {
      const userFound = await this.userService.findOne(userId);

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found : (',
        });
      }

      const profileCreated = this.profileRepository.create(body);
      // Esta accion ya no es necesaria, debido a que habilitamos la opcion
      // cascade en la relacion
      // const profileSaved = await this.profileRepository.save(profileCreated);

      userFound.profile = profileCreated;
      await this.userService.save(userFound);

      return this.userService.findOne(userId);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(): Promise<ProfileEntity[]> {
    try {
      return this.profileRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // Este metodo elimina un registro que tiene relacion
  // de hijo OneToOne
  public async delete(userId: string): Promise<DeleteResult> {
    try {
      // Encontramos los datos del registro con el registro
      // relacionado incluido
      const userFound = await this.userService.findOne(userId);

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      // Hacemos una copia del registro por si algo sale mal
      // ademas de que necistamos su ID
      const userProfile = userFound.profile;

      // Primero eliminamos la relacion en la entidad padre
      // y guardamos este cambio para evitar conflictos de
      // FK en la BD
      userFound.profile = null;
      await this.userService.save(userFound);

      // Ahora eliminamos el registro hijo, hacemos uso del id
      // almacenado en la copia del registro hijo
      const result: DeleteResult = await this.profileRepository.delete({
        id: userProfile.id,
      });

      // Si algo sale mal al momento de eliminar el registro hijo
      if (result.affected === 0) {
        // Devolvemos la relacion y guardamos para evitar datos corruptos
        userFound.profile = userProfile;
        await this.userService.save(userFound);

        // Y lanzamos la excepcion para notificar al cliente
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'Something went wrong, try it later',
        });
      }

      // Caso contrario solo notificamos que todo fue bien
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
