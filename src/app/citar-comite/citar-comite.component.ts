import Swal from 'sweetalert2';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-citar-comite',
  templateUrl: './citar-comite.component.html',
  styleUrls: ['./citar-comite.component.css']
})
export class CitarComiteComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  procesos: any;
  fecha: string = '';
  hora: string = '';
  sede: string = '';

  message: string = '';


  ngOnInit() {
    this.procesos = localStorage.getItem('procesosSeleccionados');
    this.procesos = JSON.parse(this.procesos);
    console.log(this.procesos)
  }
  validateFiels() {
    this.message = '';
    if (
      this.fecha == '' ||
      this.fecha == null ||
      this.hora == '' ||
      this.hora == null ||
      this.sede == '' ||
      this.sede == null
    ) {
      this.message = 'Todos los campos son obligatorios'
    }
    else {
      console.log('fecha', this.fecha)
      console.log('hora', this.hora)
      const fechaHoraCitacion = `${this.fecha}T${this.hora}Z`
      console.log(fechaHoraCitacion)
      this.sendAppoiment()
    }
  }
  sendAppoiment() {
    for (const item of this.procesos) {
      const body = new FormData();
      const fechaHoraCitacion = `${this.fecha}T${this.hora}Z`
      body.append('fechaHoraCitacion', fechaHoraCitacion);
      body.append('fechaCitacion', this.fecha);
      body.append('horaCitacion', this.hora);
      body.append('lugarCitacion', this.sede);
      body.append('idProcesoFK', item.id);

      this.http.post(`http://127.0.0.1:8000/evaseg_app/citaciones/`, body)
        .subscribe(
          response => {
            console.log('ok', item.id);
          },
          error => {
            console.log(error);
          }
        );

      const body2 = new FormData();
      body2.append('proceso_citado', 'True');
      this.http.patch(`http://127.0.0.1:8000/evaseg_app/actualizar-estado-cita/?id_proceso=${item.id}`, body2)
        .subscribe(
          response => {
            console.log('ok', item.id);
          },
          error => {
            console.log(error);
          }
        );
    }
    localStorage.removeItem('procesosSeleccionados')
    Swal.fire({
      title: "¡Muy bien!",
      text: "¡Se ha registrado la citaciòn correctamente!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#63a154",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/bandejaCoordinacion'])
      }
    });
  }
}
