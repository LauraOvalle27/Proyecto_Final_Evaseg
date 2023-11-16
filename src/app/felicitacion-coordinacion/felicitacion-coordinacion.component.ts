import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-felicitacion-coordinacion',
  templateUrl: './felicitacion-coordinacion.component.html',
  styleUrls: ['./felicitacion-coordinacion.component.css']
})
export class FelicitacionCoordinacionComponent {

  constructor(private router: Router){}


  goTonextPage(url: string){
    this.router.navigate([url])
  }


}
