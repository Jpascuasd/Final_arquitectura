export interface IMarca {
  id?: number;
  nombre?: string;
  descripcion?: string;
}

export class Marca implements IMarca {
  constructor(public id?: number, public nombre?: string, public descripcion?: string) {}
}
