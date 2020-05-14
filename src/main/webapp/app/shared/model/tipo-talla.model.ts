export interface ITipoTalla {
  id?: number;
  nombre?: string;
}

export class TipoTalla implements ITipoTalla {
  constructor(public id?: number, public nombre?: string) {}
}
