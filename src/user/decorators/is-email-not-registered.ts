import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../services/user.service';

//* NOTA: El decorador funciona perfectamente pero solo despues del
//* primer registro de un usuario, en el caso del primer registr
//* cuando la BD esta vacia, devolvera que el email ya esta en uso
//* aunque este vacia la BD, despues del primer registro funcionara
//* perfectamente
// Con este decorador extendemos la clase para usarla como un decorador
// custom.
@ValidatorConstraint({ name: 'IsEmailNotRegistered', async: true })
// La clase debe extender de la interfaz ValidatorConstraintInterface
export class IsEmailNotRegisteredConstraint
  implements ValidatorConstraintInterface
{
  // En el constructor podemos injectar modulos para hacer uso de sus
  // metodos, aqui inyectamos el userService para hacer uso del service
  // findByEmail()
  constructor(private readonly userService: UserService) {}

  // Este es un metodo abstracto que debe implementarse por haber
  // heredado de la interfaz
  async validate(email: string) {
    // Al retornar true significa que paso la validacion, con false
    // significa que no paso la validacion
    return this.userService.findByEmail(email).then((user) => {
      return user === undefined;
    });
  }

  // Esta es el segundo metodo abstracto, el cual nos premite definir
  // un mensaje por default si este no es enviado en el decorador
  defaultMessage(): string {
    return 'The email already in use.';
  }
}

// Esta es la funcion que registra al decorador que hemos creado y
// asi, se nos permita usarlo como decorador
// la sintaxis de esta clase y funcion de retorno siempre es la
// misma, solo cambian los datos del registro del decorador
export function IsEmailNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor, // constructor de la clase
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotRegisteredConstraint, // validador a registrar
    });
  };
}
