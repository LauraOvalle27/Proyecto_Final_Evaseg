import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-instructor',
  templateUrl: './bandeja-instructor.component.html',
  styleUrls: ['./bandeja-instructor.component.css']
})
export class BandejaInstructorComponent {
  constructor(
    private route: Router
  ){}

  goTonextPage(url: string){
    this.route.navigate([url]);
  }


}
