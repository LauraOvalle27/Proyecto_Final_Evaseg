import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinacion-inicio',
  templateUrl: './coordinacion-inicio.component.html',
  styleUrls: ['./coordinacion-inicio.component.css']
})
export class CoordinacionInicioComponent implements OnInit{

  constructor(private router: Router){}

  infoPersona: any;
  nombrePersona: String = '';
  
  ngOnInit(){
      this.infoPersona = localStorage.getItem('infoPersona')
      this.infoPersona = JSON.parse(this.infoPersona)
      this.nombrePersona = this.infoPersona.user.first_name + ' '+ this.infoPersona.user.last_name
  }

  goTonextPage(url: string){
    this.router.navigate([url])
  }

}
