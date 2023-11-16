import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-historial',
  templateUrl: './consultar-historial.component.html',
  styleUrls: ['./consultar-historial.component.css']
})
export class ConsultarHistorialComponent implements OnInit{

  constructor(
    private router: Router,
    private http: HttpClient
  ){}

  structure = true;

  infoPersona: any;
  idInstructor: string = '';

  fichaChoice: any;
  aprendizChoice: any;

  dataFichas: any;
  dataAprendizFicha: any;
  dataNombreAprediz: any;

  dataValidation: any;
  validatedata: any = [];

  listaIdFichaFK: any = [];
  listaIdAprendiz: any = [];
  listaInformacionAprendiz: any = [];

  numeroDocumentoAprendiz: string = '';
  informacionFicha: any;
  programaFormacionAprendiz: string = '';
  coordinacionAprendiz: string = '';  

  historialProcesos: any;

  message = '';

  ngOnInit() {
    // Se obtiene la información del instructor del localStorage.
    this.infoPersona = localStorage.getItem('infoPersona');
    this.infoPersona = JSON.parse(this.infoPersona);

    // Se obtiene el ID del intructor.
    this.idInstructor = this.infoPersona.user.id

    // Se obtiene las fichas relacionadas con el instrutor. 
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
    console.log(this.fichaChoice)

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
  validateFields(){
    if(
        this.fichaChoice == 'Ficha...' || 
        this.fichaChoice == null ||
        this.aprendizChoice == 'Aprendiz..' ||
        this.aprendizChoice == null ||
        this.numeroDocumentoAprendiz == '' ||
        this.numeroDocumentoAprendiz == null ||
        this.programaFormacionAprendiz == '' ||
        this.programaFormacionAprendiz == null
    ){
      this.message = '¡Todos los campos son obligatorios!';
    }
    else{
      this.message = '';
      this.structure = false;
      this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-aprendiz-ficha/?idAprendizFK=${this.aprendizChoice.id}`).subscribe((data: any) =>{
        this.validatedata = data[0];
        // En caso de que toda la información sea correcta se ejecuta la función
        this.getProcesos()  
        }
      );
    }
  }
  getProcesos(){
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-proceso-aprediz/?aprendiz_id=${this.validatedata.id}`).subscribe((data: any)=>{
      this.historialProcesos = data;
      console.log(this.historialProcesos)
    })
  }
  
}
