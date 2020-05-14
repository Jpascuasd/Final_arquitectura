import { Moment } from 'moment';

export interface IDetalleMovimiento {
  id?: number;
  codigo?: string;
  nombre?: string;
  producto?: number;
  cantidad?: number;
  fecha?: Moment;
}

export class DetalleMovimiento implements IDetalleMovimiento {
  constructor(
    public id?: number,
    public codigo?: string,
    public nombre?: string,
    public producto?: number,
    public cantidad?: number,
    public fecha?: Moment
  ) {}
}
