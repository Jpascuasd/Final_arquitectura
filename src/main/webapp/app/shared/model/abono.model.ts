import { Moment } from 'moment';

export interface IAbono {
  id?: number;
  usuario?: number;
  fecha?: Moment;
  codigo?: string;
  cantidadValor?: number;
}

export class Abono implements IAbono {
  constructor(public id?: number, public usuario?: number, public fecha?: Moment, public codigo?: string, public cantidadValor?: number) {}
}
