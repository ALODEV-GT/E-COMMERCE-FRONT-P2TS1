import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fecha, FechaGlobalService } from 'src/app/services/fecha-global.service';
import { Rep1, Rep5 } from 'src/models/InterfacesReportes';

@Component({
  selector: 'app-top-clientes-stock',
  templateUrl: './top-clientes-stock.component.html',
  styleUrls: ['./top-clientes-stock.component.css']
})
export class TopClientesStockComponent implements OnInit {

  resultados: Rep5[] = []

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

    this.reportesService.getTopClientesStock(fechaInicial, fechaFinal).subscribe((resp) => {
      this.resultados = resp;
    })
  }

}
