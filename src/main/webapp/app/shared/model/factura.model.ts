import { Moment } from 'moment';
import { FacturaEstado } from 'app/shared/model/enumerations/factura-estado.model';
import { ModoPago } from 'app/shared/model/enumerations/modo-pago.model';
import { TipoFactura } from 'app/shared/model/enumerations/tipo-factura.model';

export interface IFactura {
  id?: number;
  codigo?: string;
  estado?: FacturaEstado;
  fecha?: Moment;
  modoPago?: ModoPago;
  tipoFactura?: TipoFactura;
  fechaPago?: Moment;
  cantidad?: number;
  sucursal?: number;
}

export class Factura implements IFactura {
  constructor(
    public id?: number,
    public codigo?: string,
    public estado?: FacturaEstado,
    public fecha?: Moment,
    public modoPago?: ModoPago,
    public tipoFactura?: TipoFactura,
    public fechaPago?: Moment,
    public cantidad?: number,
    public sucursal?: number
  ) {}
}
