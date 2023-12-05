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
  message: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }


  goToNextPage(url: string) {
    this.router.navigate([url])
  }

  validateUser() {
    const body = {
      username: this.docNumber,
      password: this.password
    };
  
    this.http.post('http://127.0.0.1:8000/evaseg_app/login/', body).subscribe(
      (response: any) => {
        this.data = response;
        if (this.data.user.numeroDocumento === this.docNumber) {
          const roleId = this.data.user.idRolFK;

          switch (roleId) {
            case 2:
              this.goToNextPage('/inicioAprendiz');
              break;
            case 3:
              this.goToNextPage('/inicioInstructor');
              break;
            case 4:
              this.goToNextPage('/inicioCoordinacion');
              break;
            default:
              // Manejar otros roles si es necesario
              break;
          }  
          localStorage.setItem('infoPersona', JSON.stringify(this.data));
        }
      },
      (error: any) => {
        if (error.status === 400) {
          this.message = 'Credenciales incorrectas';
        } else {
          this.message = 'Error en el servidor';
        }
        this.password = '';
      }
    );
  }

}
