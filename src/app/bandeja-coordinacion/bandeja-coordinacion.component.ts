import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-bandeja-coordinacion',
  templateUrl: './bandeja-coordinacion.component.html',
  styleUrls: ['./bandeja-coordinacion.component.css']
})
export class BandejaCoordinacionComponent {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


  isChecked: boolean = false;
  message: string = '';
  messageActas: string = '';

  selectedItems: Proceso[] = [];


  procesosNoCitados: any;

  ngOnInit() {
    this.http.get<Proceso[]>(`http://127.0.0.1:8000/evaseg_app/consulta-procesos-citados/?proceso_citado=False&tipo_proceso=2,3`).subscribe(
      (data: Proceso[]) => {
        // Inicializar selected a false para cada objeto Proceso
        this.procesosNoCitados = data.map(proceso => ({ ...proceso, view: false, selected: false }));
      }
    );
  }

  goTonextPage(url: string) {
    this.router.navigate([url])
  }



  async toggleDetails(process: Proceso): Promise<void> {
    await this.http.get(`http://127.0.0.1:8000/evaseg_app/aprendices-ficha/${process.idAprendizFK}`).subscribe((data: any) => {
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
    await this.http.get(`http://127.0.0.1:8000/evaseg_app/instructores-ficha/${process.idInstructorFK}`).subscribe((data: any) => {
      process.idInstructor = data.idInstructorFK
      this.http.get(`http://127.0.0.1:8000/evaseg_app/usuario/${process.idInstructor}`).subscribe((data: any) => {
        process.documentoInstructor = data.numeroDocumento
        process.nombreInstructor = data.first_name + " " + data.second_name + " " + data.last_name + " " + data.second_last_name
      }
      );
    }
    );
    process.view = !process.view;
  }

  processSelectedItems(): void {
    // Filtra los elementos seleccionados
    const selectedItems = this.procesosNoCitados.filter((item: Proceso) => item.selected);
    console.log(selectedItems)
    if (selectedItems.length > 0) {
      localStorage.setItem('procesosSeleccionados', JSON.stringify(selectedItems));
      this.goTonextPage('/citarComite')
    } else {
      this.message = 'Debes seleccionar al menos un proceso.'
    }
  }

  generarActas() {
    if (this.isChecked) {
      this.router.navigate(['/actasCoordinacion'])
    }
    else {
      this.messageActas = 'No hay procesos seleccionados'
    }
  }

}
