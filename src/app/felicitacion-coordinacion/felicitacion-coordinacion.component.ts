import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-felicitacion-coordinacion',
  templateUrl: './felicitacion-coordinacion.component.html',
  styleUrls: ['./felicitacion-coordinacion.component.css']
})
export class FelicitacionCoordinacionComponent implements OnInit{

  constructor(
    private router: Router,
    private http: HttpClient,
    ){}

  infoPersona: any;
  idInstructor: string = ''; 

  dataFichas: any;
  dataAprendizFicha: any;
  dataNombreAprediz: any;

  fichaChoice: any;
  aprendizChoice: any;

  dataValidation: any;
  validatedata: any = [];

  listaIdFichaFK: any = [];
  listaIdAprendiz: any = [];
  listaInformacionAprendiz: any = [];

  numeroDocumentoAprendiz: string = '';
  informacionFicha: any;
  programaFormacionAprendiz: string = '';
  coordinacionAprendiz: string = '';
  causasProceso: string = '';

  message = '';
  
  numeroDocumentoAprendizEnvio = 0;
  numeroDocumentoInstructorEnvio = 0;
  formDataEnvio: any;  

  ngOnInit(){
    // Se obtiene la información de la coordinación del localStorage.
    this.infoPersona = localStorage.getItem('infoPersona');
    this.infoPersona = JSON.parse(this.infoPersona);

    // Se obtiene el ID de la coordinación.
    this.idInstructor = this.infoPersona.user.id

    // Se obtiene las fichas relacionadas con la coordinación. 
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-instructor-ficha/?instructor_id=${this.idInstructor}`).subscribe(
      (data: any) => {
        this.dataFichas = data;
      });
  }

  goTonextPage(url: string){
    this.router.navigate([url])
  }

  apprenticeCard(){
    /** 
     * se limpia las listas en donde se guarda la información de los aprendices, pues en caso que 
     * el instructor cambie de ficha luego de elegir por primera vez, los datos anteriores no se
     * no se pueden añadir a la información de aprendices nuevos. Asi mismo se hace para los campos
     * con infomación de los aprendices.
     **/

    this.listaInformacionAprendiz = [];
    this.listaIdAprendiz = [];

    this.numeroDocumentoAprendiz = '';
    this.programaFormacionAprendiz = '';
    this.coordinacionAprendiz = '';
    

    // primero se la lista de ID's de usuarios que son aprendices de la ficha elegida
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-aprendiz-ficha/?idFichaFK=${this.fichaChoice.idFichaFK}`).subscribe(
      (data: any) => {
        this.dataAprendizFicha = data;        
        
        for (const objeto of this.dataAprendizFicha) {
          // aquí se guarda los ID´s de los aprendices de la ficha
          this.listaIdAprendiz.push(objeto.idAprendizFK);
        }
    
        // con este ciclo buscamos, con ayuda de los ID's obtenidos en la lista anterior, se obtiene la información de los aprendices
        for (const objeto of this.listaIdAprendiz){
          this.http.get(`http://127.0.0.1:8000/evaseg_app/usuario/${objeto}`).subscribe((data: any) =>{            
            this.dataNombreAprediz = data;
            // aquí guardamos la información de los aprendices de la ficha.             
            this.listaInformacionAprendiz.push(this.dataNombreAprediz);          
          })
        }
      });   
  }
  updateFields() {
    /** 
     * se limpia los campos en donde se muestra la información de los aprendices, pues en caso que 
     * el instructor cambie de aprendiz luego de elegir por primera vez.
     **/
    this.numeroDocumentoAprendiz = '';

    // Se obtiene el número de documento del aprendiz para mostrarlo en pantalla
    this.numeroDocumentoAprendiz = this.aprendizChoice.numeroDocumento

    // de esta forma se obtiene la información correspondiente a la ficha.
    this.http.get(`http://127.0.0.1:8000/evaseg_app/fichas/${this.fichaChoice.idFichaFK}`).subscribe((data: any) =>{
      // se obtiene el programa de formación del aprendiz
      this.programaFormacionAprendiz = data.programaFormacion;
      // se obtiene el centro de dependencia del programa de formación del aprediz.
      this.coordinacionAprendiz = data.centroSena;
    });
  }

  // Es esta función se trae los documentos necesarios para soportar el proceso.
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('document', file);
      this.formDataEnvio = formData.get('document')   
  }

  validateFields(){
    // se valida que todos los campos sean no nulos o que sean distintos a los que viene por defecto.
    if( this.fichaChoice == 'Ficha...' || 
        this.fichaChoice == null ||
        this.aprendizChoice == 'Aprendiz..' ||
        this.aprendizChoice == null ||
        this.numeroDocumentoAprendiz == '' ||
        this.numeroDocumentoAprendiz == null ||
        this.programaFormacionAprendiz == '' ||
        this.programaFormacionAprendiz == null ||
        this.coordinacionAprendiz == '' ||
        this.coordinacionAprendiz == null ||
        this.causasProceso == '' ||
        this.causasProceso == null ||
        this.formDataEnvio == null  ||
        this.formDataEnvio == undefined
    ){
      this.message = '¡Todos los campos son obligarios!'
    }
    else{
      this.message = '';
      // Se trae la información de la relación entre el Aprediz y la Ficha a la que pertenece
      this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-aprendiz-ficha/?idAprendizFK=${this.aprendizChoice.id}`).subscribe((data: any) =>{
        this.validatedata = data[0];
        // En caso de que toda la información sea correcta se ejecuta la función
        this.sendInformation();
      });        
    }
  }

  sendInformation(){    
  
    // Se obtiene toda la información necesaria para realizar un método post.
    this.numeroDocumentoAprendizEnvio = this.validatedata.id
    const fechaEnvio = this.currentDate();
    this.numeroDocumentoInstructorEnvio = this.fichaChoice.id;
    // el tipo de proceso es 1 porque corresponde con felicitación.
    const tipoProcesoEnvio = 2;
    // la calificación de la falta en llamado de atención es por defecto 'leve'
    const calificacionFalta = 'No aplica';
    // el proceso por defecto debe ser activo:
    const procesoActivo = true;

    // Se construye el el cuerpo para ser envido por el método post
    
    const body = new FormData();
    body.append('fechaCreacionProceso', fechaEnvio);
    body.append('proceso_activo', procesoActivo.toString());
    body.append('causasProceso', this.causasProceso);
    body.append('recomendacionCalificacionGravedadProceso', calificacionFalta);
    body.append('RutaEvidenciasProceso', this.formDataEnvio);
    body.append('tipoProcesoFK', tipoProcesoEnvio.toString());
    body.append('idInstructorFK', this.numeroDocumentoInstructorEnvio.toString());
    body.append('idAprendizFK', this.numeroDocumentoAprendizEnvio.toString());

    const headers = new HttpHeaders();
    // Configura el tipo de contenido como "multipart/form-data"
    headers.set('Content-Type', 'multipart/form-data');  
    //Se ejecuta el método post junto con el cuerpo que se obtuvo anteriormente.
    this.http.post('http://127.0.0.1:8000/evaseg_app/procesos/', body, { headers: headers }).subscribe(
      response => {
        // Manejo de la respuesta exitosa:
        Swal.fire({
          title: "¡Muy bien!",
          text: "La felicitación ha sido enviado correctamente!",
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

  // La siguiente Función nos ayuda a hallar la fecha actual en formato año-mes-dia.
  currentDate(): string {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Asegura que el mes tenga 2 dígitos
    const day = fecha.getDate().toString().padStart(2, '0'); // Asegura que el día tenga 2 dígitos  
    return `${year}-${month}-${day}`;
  }

}
