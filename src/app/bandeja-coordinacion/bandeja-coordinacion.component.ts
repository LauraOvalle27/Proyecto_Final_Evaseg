import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-coordinacion',
  templateUrl: './bandeja-coordinacion.component.html',
  styleUrls: ['./bandeja-coordinacion.component.css']
})
export class BandejaCoordinacionComponent {

  constructor(private router: Router){}


  goTonextPage(url: string){
    this.router.navigate([url])
  }
  
}
