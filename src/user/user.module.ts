import { Global, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { IsEmailNotRegisteredConstraint } from './decorators/is-email-not-registered';
import { UserFiltersService } from './services/filters.service';
import { UsersOccupationsEntity } from './entities/users-occupations.entity';

@Global()
@Module({
  // Cuando existe una relacion ManyToMany con tabla intermedia, esta entidad
  // se debe pasar al TypeOrmModule en los modulos que estan conectados a traves
  // de esta tabla, en este caso la entidad UsersOccupationsEntity tambien esta
  // agregada en el modulo de Occupation
  imports: [TypeOrmModule.forFeature([UserEntity, UsersOccupationsEntity])],
  controllers: [UserController],
  providers: [UserService, UserFiltersService, IsEmailNotRegisteredConstraint],
  // Cuando queremos exportar algo de nuestro modulo lo agregamos al array de
  // exports, aqui solo exportamos el service, pero en el modulo donde vayamos
  // a hacer uso del UserService se debe agreagr el UserModule completo al array
  // de imports
  exports: [UserService],
})
export class UserModule {}
