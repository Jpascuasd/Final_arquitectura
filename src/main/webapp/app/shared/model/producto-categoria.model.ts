export interface IProductoCategoria {
  id?: number;
  nombre?: string;
}

export class ProductoCategoria implements IProductoCategoria {
  constructor(public id?: number, public nombre?: string) {}
}
