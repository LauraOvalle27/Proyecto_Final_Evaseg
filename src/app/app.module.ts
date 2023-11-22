import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { InicioInstructorComponent } from './inicio-instructor/inicio-instructor.component';
import { LlamadoAtencionInstructorComponent } from './llamado-atencion-instructor/llamado-atencion-instructor.component';
import { ReportarInstructorComponent } from './reportar-instructor/reportar-instructor.component';
import { ConsultarHistorialComponent } from './consultar-historial/consultar-historial.component';
import { PerfilInstructorComponent } from './perfil-instructor/perfil-instructor.component';
import { CoordinacionInicioComponent } from './coordinacion-inicio/coordinacion-inicio.component';
import { LlamadosCoordinacionComponent } from './llamados-coordinacion/llamados-coordinacion.component';
import { FallosCoordinacionComponent } from './fallos-coordinacion/fallos-coordinacion.component';
import { FelicitacionCoordinacionComponent } from './felicitacion-coordinacion/felicitacion-coordinacion.component';
import { ActasCoordinacionComponent } from './actas-coordinacion/actas-coordinacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilCoordinacionComponent } from './perfil-coordinacion/perfil-coordinacion.component';
import { BandejaCoordinacionComponent } from './bandeja-coordinacion/bandeja-coordinacion.component';
import { InicioAprendizComponent } from './inicio-aprendiz/inicio-aprendiz.component';
import { MiHistorialComponent } from './mi-historial/MiHistorialComponent';
import { CitacionesAprendizComponent } from './citaciones-aprendiz/citaciones-aprendiz.component';
import { BandejaAprendizComponent } from './bandeja-aprendiz/bandeja-aprendiz.component';
import { DescargosAprendizComponent } from './descargos-aprendiz/descargos-aprendiz.component';
import { PerfilAprendizComponent } from './perfil-aprendiz/perfil-aprendiz.component';
import { BandejaInstructorComponent } from './bandeja-instructor/bandeja-instructor.component';
import { ReportarCoordinacionComponent } from './reportar-coordinacion/reportar-coordinacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent,
    InicioInstructorComponent,
    LlamadoAtencionInstructorComponent,
    ReportarInstructorComponent,
    ConsultarHistorialComponent,
    PerfilInstructorComponent,
    CoordinacionInicioComponent,
    LlamadosCoordinacionComponent,
    FallosCoordinacionComponent,
    FelicitacionCoordinacionComponent,
    ActasCoordinacionComponent,
    PerfilCoordinacionComponent,
    BandejaCoordinacionComponent,
    InicioAprendizComponent,
    MiHistorialComponent,
    CitacionesAprendizComponent,
    BandejaAprendizComponent,
    DescargosAprendizComponent,
    PerfilAprendizComponent,
    BandejaInstructorComponent,
    ReportarCoordinacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
