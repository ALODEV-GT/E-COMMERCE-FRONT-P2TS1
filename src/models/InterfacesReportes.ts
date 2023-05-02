//Rep1
export interface Rep1 {
  _id: IDR1;
  unidadesTotales: number;
}

export interface IDR1 {
  nombre: string;
}

//Rep2
export interface Rep2 {
  _id: IDR2;
  ganancia: number;
}

export interface IDR2 {
  vendedor: string;
}

//Rep3
export interface Rep3 {
  _id: IDR3;
  unidadesTotales: number;
}

export interface IDR3 {
  vendedor: string;
}


//Rep4
export interface Rep4 {
  _id: IDR4;
  pedidos: number;
}

export interface IDR4 {
  comprador: string;
}


//Rep5
export interface Rep5 {
  _id:        string;
  stockTotal: number;
}

