import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fecha, FechaGlobalService } from 'src/app/services/fecha-global.service';
import { Rep1 } from 'src/models/InterfacesReportes';

@Component({
  selector: 'app-top-productos-vendidos',
  templateUrl: './top-productos-vendidos.component.html',
  styleUrls: ['./top-productos-vendidos.component.css']
})
export class TopProductosVendidosComponent implements OnInit {

  resultados: Rep1[] = []

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

    this.reportesService.getTopProductosVendidos(fechaInicial, fechaFinal).subscribe((resp) => {
      this.resultados = resp;
    })
  }

}
