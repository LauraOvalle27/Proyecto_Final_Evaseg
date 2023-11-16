import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-mi-historial',
  templateUrl: './mi-historial.component.html',
  styleUrls: ['./mi-historial.component.css']
})
export class MiHistorialComponent implements OnInit {

  constructor(
    private route: Router,
    private http: HttpClient
  ) { }

  infoPersona:any;
  idAprendiz:String= '';

  relacionFichaAprendiz: any;

  historialProcesos: any;

  structure = true;


  ngOnInit() {
    

    this.infoPersona = localStorage.getItem('infoPersona');
    this.infoPersona = JSON.parse(this.infoPersona);

    this.idAprendiz = this.infoPersona.user.id
    // Se trae la información de la relación entre el Aprediz y la Ficha a la que pertenece
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-aprendiz-ficha/?idAprendizFK=${this.infoPersona.user.id}`).subscribe((data: any) =>{
      this.relacionFichaAprendiz = data[0].id;
      // En caso de que toda la información sea correcta se ejecuta la función
    });    
  }

  goTonextPage(url: string) {
    this.route.navigate([url]);
  }

  consultarHistorial(){
    
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-proceso-aprediz/?aprendiz_id=${this.relacionFichaAprendiz}`).subscribe((data: any) =>{
      this.historialProcesos = data;
      this.structure = false;
    })
  }



}
