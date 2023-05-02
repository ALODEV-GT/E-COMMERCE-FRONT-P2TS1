import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fecha, FechaGlobalService } from 'src/app/services/fecha-global.service';
import { Rep3 } from 'src/models/InterfacesReportes';

@Component({
  selector: 'app-top-clientes-productos-vendidos',
  templateUrl: './top-clientes-productos-vendidos.component.html',
  styleUrls: ['./top-clientes-productos-vendidos.component.css']
})
export class TopClientesProductosVendidosComponent implements OnInit {

  resultados: Rep3[] = []

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

    this.reportesService.getTopClientesProductosVendidos(fechaInicial, fechaFinal).subscribe((resp) => {
      this.resultados = resp;
    })
  }

}
