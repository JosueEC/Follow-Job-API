import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CustomMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    /*
      A traves del objeto request, podemos acceder a las propiedas
      justamente como lo hacemos en express. Los middlewares trabajan
      exactamente de la misma forma.
     */
    const isTextRequest = req.body && typeof req.body === 'string';

    if (isTextRequest) {
      req.url = '/marketer-bot/text';
      // Modificando la URL de la request
      // es como podemos redirigir el control de la request a otro
      // controlador de nuestra aplicacion
    } else {
      req.url = '/marketer-bot/image';
    }

    next();
    // La funcion next es la que nos permite que la request siga su
    // camino al siguiente controlador

    // Este middleware debe ser registrado en la clase del modulo
    // donde sera usado
  }
}
