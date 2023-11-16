import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fallos-coordinacion',
  templateUrl: './fallos-coordinacion.component.html',
  styleUrls: ['./fallos-coordinacion.component.css']
})
export class FallosCoordinacionComponent {

  constructor(private router: Router){}


  goTonextPage(url: string){
    this.router.navigate([url])
  }


}
