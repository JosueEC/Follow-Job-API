import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateOccupationDto } from './create-occupation.dto';
import { CreateSkillDto } from 'src/skill/dto';
import { Type } from 'class-transformer';

//* NOTA: Los DTO deben contener al menos una validacion por
//* parte de class-validator para que sean reconocidos en la
//* ruta del controlador, de lo contrario estos se reciben
//* como undefined, puede estar relacionado a la configuracion
//* del validation pipe en main.ts
// TODO: Investigar bien la configuracion del validationPipe
export class CreateOccupationSkillDto {
  @IsNotEmpty()
  @IsObject()
  // Con el decorador @ValidateNested podemos realizar validaciones
  // de forma anidada cuando son estructuras de datos que contiene
  // otras estructuras anidadas, en conjunto con el decorador
  // @Type podemos reutilizar las validaciones usadas en el DTO que
  // se esta usando para tipar, de esta forma validamos los datos
  // de este DTO y asi mismo de los DTO que vienen anidados en las
  // estructuras de datos
  @ValidateNested({ each: true })
  @Type(() => CreateOccupationDto)
  occupation: CreateOccupationDto;

  @IsNotEmpty()
  // Tambien disponemos de validadores para estructuras de datos,
  // por ejemplo, aqui validamos que el dato recibido sea un array
  // y que este tenga al menos 1 elemento
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  skills: Array<CreateSkillDto>;
}
