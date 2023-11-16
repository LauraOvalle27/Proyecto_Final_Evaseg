import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlApi: string = 'http://127.0.0.1:8000/evaseg_app/login/';
  docNumber: string = '';
  password: string = '';
  data: any;
  message : string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    ){}

  ngOnInit() {
  }

  
  goToNextPage(url: string){
    this.router.navigate([url])
  }

  validateUser(){
    const body = {
      username: this.docNumber,
      password: this.password
    }
    this.http.post('http://127.0.0.1:8000/evaseg_app/login/', body).subscribe((data: any) =>{
      this.data = data;
      if(this.data.user.numeroDocumento == this.docNumber){
        if(this.data.user.idRolFK == 2){
          this.goToNextPage('/inicioAprendiz')
        }else if(this.data.user.idRolFK == 3){
          this.goToNextPage('/inicioInstructor')          
        }else if(this.data.user.idRolFK == 4){
          this.goToNextPage('/inicioCoordinacion')
        }
        localStorage.setItem('infoPersona', JSON.stringify(this.data))
      }
      else{
        this.message = 'credenciales incorrectas';        
      }
    });  
  }
}
