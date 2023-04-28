import { Tarjeta } from "./Tarjeta";

export class Usuario {
  constructor(
    public nombre: string,
    public usuario: string,
    public contrasena: string,
    public rol: string,
    public tarjetas: Tarjeta[]
  ) { }

}
