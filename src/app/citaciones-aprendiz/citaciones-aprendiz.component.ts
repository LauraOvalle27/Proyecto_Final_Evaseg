import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citaciones-aprendiz',
  templateUrl: './citaciones-aprendiz.component.html',
  styleUrls: ['./citaciones-aprendiz.component.css']
})
export class CitacionesAprendizComponent {

  constructor(
    private route: Router
  ){}

  goTonextPage(url: string){
    this.route.navigate([url]);
  }

 
}
