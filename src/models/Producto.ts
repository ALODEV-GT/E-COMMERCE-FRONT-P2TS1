import { Ganancia } from "./Ganancia";
import { Solicitud } from "./Solicitud";

export class Producto {
  constructor(
    public _id: string,
    public usuario: String,
    public nombre: String,
    public descripcion: String,
    public imagen: String,
    public precio: number,
    public categoria: String,
    public stock: number,
    public solicitud: Solicitud,
    public unidadesCompra?: number,
    public fechaCompra?: string,
    public imagenContenido?: String,
    public ganancia?: Ganancia
  ) { }

}
