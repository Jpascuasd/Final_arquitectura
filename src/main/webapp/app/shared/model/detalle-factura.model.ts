export interface IDetalleFactura {
  id?: number;
  producto?: string;
  codigoProducto?: string;
  cantidad?: string;
}

export class DetalleFactura implements IDetalleFactura {
  constructor(public id?: number, public producto?: string, public codigoProducto?: string, public cantidad?: string) {}
}
