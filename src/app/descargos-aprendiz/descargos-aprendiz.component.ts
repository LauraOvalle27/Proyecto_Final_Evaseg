import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-descargos-aprendiz',
  templateUrl: './descargos-aprendiz.component.html',
  styleUrls: ['./descargos-aprendiz.component.css']
})
export class DescargosAprendizComponent implements OnInit {

  constructor(
    private route: Router,
    private http: HttpClient,

  ) { }

  message: string = '';

  infoPersona: any;
  infoFichaAprendiz: any;
  procesos: any;

  descargoProceso: any = {};
  structure = true;

  procesoChoice: any;
  formDataEnvio: any;
  descargos: string = '';

  ngOnInit() {
    // Se obtiene la información del instructor del localStorage.
    this.infoPersona = localStorage.getItem('infoPersona');
    this.infoPersona = JSON.parse(this.infoPersona);
    // Se obtiene la relación entre el aprendiz y la ficha.
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-aprendiz-ficha/?idAprendizFK=${this.infoPersona.user.id}`).subscribe(
      (data: any) => {
        this.infoFichaAprendiz = data[0];
        // Se obtienen los procesos abiertos de tipo CES.
        this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-proceso-aprediz/?aprendiz_id=${this.infoFichaAprendiz.id}&proceso_activo=True&tipo_proceso=3`).subscribe(
          (data: any) => {
            this.procesos = data;
          }
        );
      }
    );
  }

  goTonextPage(url: string) {
    this.route.navigate([url]);
  }

  // Es esta función se trae los documentos necesarios para soportar el proceso.
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('document', file)
    this.formDataEnvio = formData.get('document')
  }
  async viewButton() {
    this.message = '';
    this.structure = true;
    if (this.procesoChoice != 'ID de Procesos Activos...') {
      const data: any = await this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-descargo-idProceso/?id_proceso=${this.procesoChoice.id}`).toPromise();  
      if (Array.isArray(data) && data.length > 0) {
        this.message = `El proceso con id ${this.procesoChoice.id} ya tiene descargos.`
        this.procesoChoice == 'ID de Procesos Activos...';
        this.structure = false;
      } 
    }
  }
  validateFields(){
    if(
      this.formDataEnvio == null ||
      this.formDataEnvio == undefined ||
      this.descargos == '' ||
      this.descargos == null ||
      this.procesoChoice == 'ID de Procesos Activos...' ||
      this.procesoChoice == null
    ){
      this.message = 'Todos los campos son obligatorios';
    }else{
      this.message = "";
      this.sendInformation();
    }
  }
  
  async sendInformation() {
    // Se obtiene toda la información necesaria para realizar un método post.
    const body = new FormData();
    body.append('decargoProceso', this.descargos);
    body.append('rutaSoporteDescargo', this.formDataEnvio);
    body.append('fechaEnvioDescargos', this.currentDate());
    body.append('idProcesoFK', this.procesoChoice.id);
    
    const headers = new HttpHeaders();

    // Configura el tipo de contenido como "multipart/form-data"
    headers.set('Content-Type', 'multipart/form-data');

    //Se ejecuta el método put junto con el cuerpo que se obtuvo anteriormente.
    this.http.post(`http://127.0.0.1:8000/evaseg_app/descargo/`, body, { headers: headers }).subscribe(
      response => {
        // Manejo de la respuesta exitosa:
        Swal.fire({
          title: "¡Muy bien!",
          text: "Los descargos se ha registrado correctamente!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#63a154",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      },
      error => {
        // Manejor de errores:
        this.message = "Algo salió mal. Comunícate con el soporte."
      }
    );
  }
  currentDate() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const dia = ('0' + fecha.getDate()).slice(-2);
    const horas = ('0' + fecha.getHours()).slice(-2);
    const minutos = ('0' + fecha.getMinutes()).slice(-2);
    const segundos = ('0' + fecha.getSeconds()).slice(-2);
    const formatoFechaHora = `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}Z`;
    return formatoFechaHora;
  }
}
