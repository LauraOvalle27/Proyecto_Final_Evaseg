import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-llamados-coordinacion',
  templateUrl: './llamados-coordinacion.component.html',
  styleUrls: ['./llamados-coordinacion.component.css']
})
export class LlamadosCoordinacionComponent {

  constructor(private router: Router){}


  goTonextPage(url: string){
    this.router.navigate([url])
  }

}
