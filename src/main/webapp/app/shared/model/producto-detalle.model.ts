export interface IProductoDetalle {
  id?: number;
  codigo?: string;
}

export class ProductoDetalle implements IProductoDetalle {
  constructor(public id?: number, public codigo?: string) {}
}
