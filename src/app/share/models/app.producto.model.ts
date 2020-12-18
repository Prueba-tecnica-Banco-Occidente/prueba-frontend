export class Producto{
    _id!: string;
    nombre!: string;
    descripcion!: string;
    categoria!: string;
    precio!: Number;
    cantidad!: Number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}