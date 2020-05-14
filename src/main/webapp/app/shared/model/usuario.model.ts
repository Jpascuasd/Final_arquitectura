import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IUsuario {
  id?: number;
  nombre?: string;
  apellido?: string;
  genero?: string;
  rol?: number;
  telefono?: Moment;
  direccion?: string;
  job?: IUser;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public genero?: string,
    public rol?: number,
    public telefono?: Moment,
    public direccion?: string,
    public job?: IUser
  ) {}
}
