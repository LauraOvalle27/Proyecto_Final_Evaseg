import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-coordinacion',
  templateUrl: './bandeja-coordinacion.component.html',
  styleUrls: ['./bandeja-coordinacion.component.css']
})
export class BandejaCoordinacionComponent {

  isChecked: boolean = false;
  message: string = '';
  messageActas: string = '';

  moreDetails= true;

  constructor(private router: Router){}


  goTonextPage(url: string){
    this.router.navigate([url])
  }

  citar(){
    if(this.isChecked){
      this.router.navigate(['/citarComite'])
    }
    else{
      this.message ='No hay procesos seleccionados'
    }
  }
  
  generarActas(){
    if(this.isChecked){
      this.router.navigate(['/actasCoordinacion'])
    }
    else{
      this.messageActas ='No hay procesos seleccionados'
    }
  }

  toggleDetails() {
    this.moreDetails = !this.moreDetails;
  }

}
