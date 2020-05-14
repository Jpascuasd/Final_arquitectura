export interface ILista {
  id?: number;
  nombre?: string;
  codigo?: string;
  descripcionContentType?: string;
  descripcion?: any;
}

export class Lista implements ILista {
  constructor(
    public id?: number,
    public nombre?: string,
    public codigo?: string,
    public descripcionContentType?: string,
    public descripcion?: any
  ) {}
}
