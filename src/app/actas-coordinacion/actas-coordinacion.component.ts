import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-actas-coordinacion',
  templateUrl: './actas-coordinacion.component.html',
  styleUrls: ['./actas-coordinacion.component.css']
})
export class ActasCoordinacionComponent {

  constructor(private router: Router){}


  goTonextPage(url: string){
    this.router.navigate([url])
  }




}
