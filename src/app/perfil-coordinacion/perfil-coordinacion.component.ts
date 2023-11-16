import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-coordinacion',
  templateUrl: './perfil-coordinacion.component.html',
  styleUrls: ['./perfil-coordinacion.component.css']
})
export class PerfilCoordinacionComponent implements OnInit{

  constructor(private router: Router){}

  infoPersona: any;
  nombrePersona: String = '';
  emailPersona: String = '';
  
  ngOnInit(){
      this.infoPersona = localStorage.getItem('infoPersona')
      this.infoPersona = JSON.parse(this.infoPersona)
      this.nombrePersona =  this.infoPersona.user.first_name + ' ' + 
                            this.infoPersona.user.second_name + ' ' + 
                            this.infoPersona.user.last_name + ' ' +
                            this.infoPersona.user.second_last_name;
      this.emailPersona = this.infoPersona.user.email
  }

  goTonextPage(url: string){
    this.router.navigate([url])
  }

}
