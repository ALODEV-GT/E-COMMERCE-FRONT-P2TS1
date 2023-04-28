import { Ganancia } from "./Ganancia";
import { Producto } from "./Producto";

export class Orden {
  constructor(
    public comprador_usuario: string,
    public fecha_pedido: string,
    public fecha_entrega: string,
    public estado: String,
    public productos: Producto[],
    public ganancia: Ganancia
  ) { }
}
