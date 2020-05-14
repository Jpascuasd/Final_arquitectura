export interface ITalla {
  id?: number;
  nombre?: string;
}

export class Talla implements ITalla {
  constructor(public id?: number, public nombre?: string) {}
}
