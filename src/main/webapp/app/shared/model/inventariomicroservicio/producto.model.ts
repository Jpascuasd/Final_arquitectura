export interface IProducto {
  id?: number;
  nombre?: string;
  referencia?: string;
  descripcion?: string;
  codigo?: string;
  proveedor?: number;
}

export class Producto implements IProducto {
  constructor(
    public id?: number,
    public nombre?: string,
    public referencia?: string,
    public descripcion?: string,
    public codigo?: string,
    public proveedor?: number
  ) {}
}
