import { Moment } from 'moment';
import { TipoMovimiento } from 'app/shared/model/enumerations/tipo-movimiento.model';

export interface IMovimiento {
  id?: number;
  tipo?: TipoMovimiento;
  fecha?: Moment;
  sucursal?: number;
  motivo?: string;
  observacion?: string;
}

export class Movimiento implements IMovimiento {
  constructor(
    public id?: number,
    public tipo?: TipoMovimiento,
    public fecha?: Moment,
    public sucursal?: number,
    public motivo?: string,
    public observacion?: string
  ) {}
}
