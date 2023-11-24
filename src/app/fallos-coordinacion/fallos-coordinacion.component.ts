import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fallos-coordinacion',
  templateUrl: './fallos-coordinacion.component.html',
  styleUrls: ['./fallos-coordinacion.component.css']
})
export class FallosCoordinacionComponent implements OnInit{

  constructor(
    private router: Router,
    private http: HttpClient){}

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
  message: string = "";

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

  goTonextPage(url: string){
    this.router.navigate([url])
  }

  apprenticeCard(){
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
        for (const objeto of this.listaIdAprendiz){
          this.http.get(`http://127.0.0.1:8000/evaseg_app/usuario/${objeto}`).subscribe((data: any) =>{            
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
    this.http.get(`http://127.0.0.1:8000/evaseg_app/fichas/${this.fichaChoice.idFichaFK}`).subscribe((data: any) =>{
      // se obtiene el programa de formación del aprendiz
      this.programaFormacionAprendiz = data.programaFormacion;
    });
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-proceso-aprediz/?aprendiz_id=${this.aprendizChoice.idAprendizFicha}&proceso_activo=True&tipo_proceso=3`).subscribe((data: any) =>{             
      this.procesosAprendiz = data;                                   
    });
  }
  viewProceso(){
    if(this.procesoChoice !='ID de Procesos Activos...'){
      this.structure = true;
      this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-proceso-aprediz/?aprendiz_id=${this.aprendizChoice.idAprendizFicha}&proceso_activo=True&tipo_proceso=3`).subscribe((data: any) =>{             
      this.procesosAprendiz = data;                                   
      })
    }else{
      
    }    
  }
}
