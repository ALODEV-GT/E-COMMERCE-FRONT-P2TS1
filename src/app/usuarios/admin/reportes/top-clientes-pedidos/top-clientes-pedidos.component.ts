import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fecha, FechaGlobalService } from 'src/app/services/fecha-global.service';
import { Rep4 } from 'src/models/InterfacesReportes';

@Component({
  selector: 'app-top-clientes-pedidos',
  templateUrl: './top-clientes-pedidos.component.html',
  styleUrls: ['./top-clientes-pedidos.component.css']
})
export class TopClientesPedidosComponent implements OnInit {

  resultados: Rep4[] = []

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private fechaGlobalService: FechaGlobalService
  ) {
    this.fechaGlobalService.obtenerFecha().subscribe((resp: Fecha) => {
      this.miFormulario.controls["fechaInicial"].setValue(this.fechaGlobalService.convertirFecha(resp.fecha));
      this.miFormulario.controls["fechaFinal"].setValue(this.fechaGlobalService.convertirFecha(resp.fecha));
    })
  }

  ngOnInit(): void {

  }

  miFormulario: FormGroup = this.fb.group({
    fechaInicial: [, [Validators.required]],
    fechaFinal: [, [Validators.required]],
  },

  )

  mostrar() {
    const fechaInicial: string = this.miFormulario.get('fechaInicial')?.value;
    const fechaFinal: string = this.miFormulario.get('fechaFinal')?.value;

    this.reportesService.getTopClientesPedidos(fechaInicial, fechaFinal).subscribe((resp) => {
      this.resultados = resp;
    })
  }

}
