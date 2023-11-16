import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descargos-aprendiz',
  templateUrl: './descargos-aprendiz.component.html',
  styleUrls: ['./descargos-aprendiz.component.css']
})
export class DescargosAprendizComponent {

  constructor(
    private route: Router
  ){}

  goTonextPage(url: string){
    this.route.navigate([url]);
  }
  
}
