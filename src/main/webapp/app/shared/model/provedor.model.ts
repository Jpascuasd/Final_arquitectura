export interface IProvedor {
  id?: number;
  codigo?: number;
}

export class Provedor implements IProvedor {
  constructor(public id?: number, public codigo?: number) {}
}
