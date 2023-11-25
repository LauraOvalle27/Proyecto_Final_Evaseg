import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fallos-coordinacion',
  templateUrl: './fallos-coordinacion.component.html',
  styleUrls: ['./fallos-coordinacion.component.css']
})
export class FallosCoordinacionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient) { }

  infoPersona: any;
  idCordinacion: string = '';
  dataFichas: any;
  dataAprendizFicha: any;

  listaIdAprendiz: any = [];
  listaInformacionAprendiz: any = [];

  fichaChoice: any;
  aprendizChoice: any;

  numeroDocumentoAprendiz: string = '';
  programaFormacionAprendiz: string = '';
  procesosAprendiz: any = [];

  structure = false;
  procesoChoice: any;
  descargoProceso: any;
  message: string = "";

  decision: string = "";
  calificacionFalta: string = "";
  formDataEnvio: any;

  ngOnInit() {
    // Sse obtiene la información del instructor del localStorage.
    this.infoPersona = localStorage.getItem('infoPersona');
    this.infoPersona = JSON.parse(this.infoPersona);

    // Se obtiene el ID del intructor.
    this.idCordinacion = this.infoPersona.user.id

    // Se obtiene las fichas relacionadas con el instrutor. 
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-instructor-ficha/?instructor_id=${this.idCordinacion}`).subscribe(
      (data: any) => {
        this.dataFichas = data;
      });
  }

  goTonextPage(url: string) {
    this.router.navigate([url])
  }

  apprenticeCard() {
    /** 
     * se limpia las listas en donde se guarda la información de los aprendices, pues en caso que 
     * la coordinación cambie de ficha luego de elegir por primera vez, los datos anteriores no se
     * no se pueden añadir a la información de aprendices nuevos. Asi mismo se hace para los campos
     * con infomación de los aprendices.
     **/

    this.listaInformacionAprendiz = [];
    this.listaIdAprendiz = [];

    this.numeroDocumentoAprendiz = '';
    this.programaFormacionAprendiz = '';

    // primero se guarda la lista de ID's de usuarios que son aprendices de la ficha elegida
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-aprendiz-ficha/?idFichaFK=${this.fichaChoice.idFichaFK}`).subscribe(
      (data: any) => {
        this.dataAprendizFicha = data;

        for (const objeto of this.dataAprendizFicha) {
          // aquí se guarda los ID´s de los aprendices de la ficha
          this.listaIdAprendiz.push(objeto.idAprendizFK);
        }

        // con este ciclo buscamos, con ayuda de los ID's obtenidos en la lista anterior, se obtiene la información de los aprendices
        for (const objeto of this.listaIdAprendiz) {
          this.http.get(`http://127.0.0.1:8000/evaseg_app/usuario/${objeto}`).subscribe((data: any) => {
            const dataAprendiz = {
              idAprendizFicha: objeto,
              informacion: data
            };
            // aquí guardamos la información de los aprendices de la ficha.             
            this.listaInformacionAprendiz.push(dataAprendiz);
          })
        }
        console.log(this.listaInformacionAprendiz)
      });
  }

  updateFields() {
    /** 
     * se limpia los campos en donde se muestra la información de los aprendices, pues en caso que 
     * el instructor cambie de aprendiz luego de elegir por primera vez.
     **/
    this.numeroDocumentoAprendiz = '';

    // Se obtiene el número de documento del aprendiz para mostrarlo en pantalla
    this.numeroDocumentoAprendiz = this.aprendizChoice.informacion.numeroDocumento

    // de esta forma se obtiene la información correspondiente a la ficha.
    this.http.get(`http://127.0.0.1:8000/evaseg_app/fichas/${this.fichaChoice.idFichaFK}`).subscribe((data: any) => {
      // se obtiene el programa de formación del aprendiz
      this.programaFormacionAprendiz = data.programaFormacion;
    });
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-proceso-aprediz/?aprendiz_id=${this.aprendizChoice.idAprendizFicha}&proceso_activo=True&tipo_proceso=3`).subscribe((data: any) => {
      this.procesosAprendiz = data;
    });
  }
  async viewProceso() {
    if (this.procesoChoice != 'ID de Procesos Activos...') {
      const data: any = await this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-descargo-idProceso/?id_proceso=${this.procesoChoice.id}`).toPromise();
      if (Array.isArray(data) && data.length === 0) {
        this.descargoProceso.rutaSoporteDescargo = "Sin Ruta"
        this.descargoProceso.fechaEnvioDescargos = "No enviado"
        this.descargoProceso.decargoProceso = "No enviado"
      } else {
        this.descargoProceso = data[0];
      }
      this.structure = true;
    } else {
      this.structure = false;
    }
  }
  // Es esta función se trae los documentos necesarios para soportar el proceso.
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('document', file)
    this.formDataEnvio = formData.get('document')
  }
  validateFields() {
    if (
      this.procesoChoice == "" ||
      this.procesoChoice == null ||
      this.procesoChoice == "ID de Procesos Activos..." ||
      this.decision == null ||
      this.decision == "" ||
      this.calificacionFalta == "" ||
      this.calificacionFalta == "Tipo de falta..." ||
      this.formDataEnvio == null ||
      this.formDataEnvio == undefined
    ) {
      this.message = '¡Todos los campos son obligarios!';
    } else {
      this.message = "";
      this.sendInformation();
    }
  }
  async sendInformation() {
    // Se obtiene toda la información necesaria para realizar un método post.
    const body = new FormData();
    body.append('calificacionGravedadProceso', this.calificacionFalta);
    body.append('fechaHoraFinProceso', this.currentDate());
    body.append('documentoComite', this.formDataEnvio);
    body.append('proceso_culminado', true.toString());
    body.append('decisionProceso', this.decision);
    body.append('idProcesoFK', this.procesoChoice.id)

    const data: any = await this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-detalleProceso-idProceso/?id_proceso=${this.procesoChoice.id}`).toPromise();
    console.log("este id", data[0].id)

    const headers = new HttpHeaders();
    // Configura el tipo de contenido como "multipart/form-data"
    headers.set('Content-Type', 'multipart/form-data');
    //Se ejecuta el método put junto con el cuerpo que se obtuvo anteriormente.
    this.http.put(`http://127.0.0.1:8000/evaseg_app/detalleProceso/${data[0].id}/`, body, { headers: headers }).subscribe(
      response => {
        // Manejo de la respuesta exitosa:
        Swal.fire({
          title: "¡Muy bien!",
          text: "El reporte se ha realizado correctamente!",
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
    console.log(formatoFechaHora);
    return formatoFechaHora;

  }
}
