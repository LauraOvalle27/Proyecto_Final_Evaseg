import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-aprendiz',
  templateUrl: './bandeja-aprendiz.component.html',
  styleUrls: ['./bandeja-aprendiz.component.css']
})
export class BandejaAprendizComponent {

  constructor(
    private route: Router
  ){}

  goTonextPage(url: string){
    this.route.navigate([url]);
  }

}
