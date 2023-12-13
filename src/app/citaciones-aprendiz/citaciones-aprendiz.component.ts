import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citaciones-aprendiz',
  templateUrl: './citaciones-aprendiz.component.html',
  styleUrls: ['./citaciones-aprendiz.component.css']
})
export class CitacionesAprendizComponent implements OnInit {


  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  infoPersona: any;
  idAprendiz: string = '';
  dataFicha: any;
  citaciones: any;

  ngOnInit() {
    // Se obtiene la información del instructor del localStorage.
    this.infoPersona = localStorage.getItem('infoPersona');
    this.infoPersona = JSON.parse(this.infoPersona);

    // Se obtiene la ficha relacionada con el aprendiz. 
    this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-aprendiz-ficha/?idAprendizFK=${this.infoPersona.user.id}`).subscribe(
      (data: any) => {
        this.dataFicha = data[0];
        console.log(this.dataFicha)
        this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-proceso-aprediz/?aprendiz_id=${this.dataFicha.id}&proceso_activo=True&tipo_proceso=2,3`).subscribe(
          (data: any) => {
            console.log('procesos', data)
            for(const object of data){
              console.log(object.id)
              this.http.get(`http://127.0.0.1:8000/evaseg_app/consulta-citacion-proceso/?idProceso_FK=${object.id}`).subscribe(
                (data: any) => {
                  this.citaciones = data;
                  console.log(this.citaciones)
                }
              )
            }            
          }
        )

      }
    );
  }

  goTonextPage(url: string) {
    this.router.navigate([url]);
  }

}
