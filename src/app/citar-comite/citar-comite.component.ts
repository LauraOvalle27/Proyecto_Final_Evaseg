import Swal from 'sweetalert2';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Proceso {
  id: number;
  fechaCreacionProceso: string;
  proceso_activo: boolean;
  proceso_citado: boolean;
  causasProceso: string;
  recomendacionCalificacionGravedadProceso: string;
  RutaEvidenciasProceso: string;
  tipoProcesoFK: number;
  idInstructorFK: number;
  idAprendizFK: number;
  view: boolean;
  selected: boolean;
  // Para los detalles
  ficha: string;
  nombreAprendiz: string;
  idAprendiz: string;
  emailAprendiz: string;
  documentoAprendiz: string;
  nombreInstructor: string;
  idInstructor: string;
  documentoInstructor: string;
}

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
  async sendAppoiment() {
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

      const process: Proceso = {
        id: 0,
        fechaCreacionProceso: '',
        proceso_activo: false,
        proceso_citado: false,
        causasProceso: item.causasProceso,
        recomendacionCalificacionGravedadProceso: '',
        RutaEvidenciasProceso: '',
        tipoProcesoFK: 0,
        idInstructorFK: 0,
        idAprendizFK: 0,
        view: false,
        selected: false,
        ficha: '',
        nombreAprendiz: '',
        idAprendiz: '',
        emailAprendiz: '',
        documentoAprendiz: '',
        nombreInstructor: '',
        idInstructor: '',
        documentoInstructor: '',
      };
      await this.http.get(`http://127.0.0.1:8000/evaseg_app/aprendices-ficha/${item.idAprendizFK}`).subscribe((data: any) => {
        process.ficha = data.idFichaFK
        process.idAprendiz = data.idAprendizFK
        this.http.get(`http://127.0.0.1:8000/evaseg_app/usuario/${process.idAprendiz}`).subscribe((data: any) => {
          process.documentoAprendiz = data.numeroDocumento
          process.emailAprendiz = data.email
          process.nombreAprendiz = data.first_name + " " + data.second_name + " " + data.last_name + " " + data.second_last_name
        }
        );
      }
      );
      await this.http.get(`http://127.0.0.1:8000/evaseg_app/instructores-ficha/${item.idInstructorFK}`).subscribe((data: any) => {
        process.idInstructor = data.idInstructorFK
        this.http.get(`http://127.0.0.1:8000/evaseg_app/usuario/${process.idInstructor}`).subscribe((data: any) => {
          process.documentoInstructor = data.numeroDocumento
          process.nombreInstructor = data.first_name + " " + data.second_name + " " + data.last_name + " " + data.second_last_name
          this.sendEmail(process)
        }
        );
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
  async sendEmail(process: Proceso) {

    const body3 = new FormData();
    body3.append('nombre_aprendiz', process.nombreAprendiz);
    body3.append('nombre_instructor', process.nombreInstructor);
    body3.append('causas', process.causasProceso);

    await this.http.post(`http://127.0.0.1:8000/evaseg_app/send-email/?correo_destino=${process.emailAprendiz}`, body3).toPromise();
  }

}
