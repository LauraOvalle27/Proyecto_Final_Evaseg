import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { BandejaCoordinacionComponent } from './bandeja-coordinacion/bandeja-coordinacion.component';
import { PerfilCoordinacionComponent } from './perfil-coordinacion/perfil-coordinacion.component';
import { CitarComiteComponent } from './citar-comite/citar-comite.component';

import { InicioAprendizComponent } from './inicio-aprendiz/inicio-aprendiz.component';
import { MiHistorialComponent } from './mi-historial/MiHistorialComponent';
import { CitacionesAprendizComponent } from './citaciones-aprendiz/citaciones-aprendiz.component';
import { BandejaAprendizComponent } from './bandeja-aprendiz/bandeja-aprendiz.component';
import { DescargosAprendizComponent } from './descargos-aprendiz/descargos-aprendiz.component';
import { PerfilAprendizComponent } from './perfil-aprendiz/perfil-aprendiz.component';
import { BandejaInstructorComponent } from './bandeja-instructor/bandeja-instructor.component';
import { ReportarCoordinacionComponent } from './reportar-coordinacion/reportar-coordinacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recoverPassword', component: RecoverPasswordComponent },

  { path: 'inicioInstructor', component: InicioInstructorComponent },
  { path: 'llamadosInstructor', component: LlamadoAtencionInstructorComponent },
  { path: 'reportarAprendiz', component: ReportarInstructorComponent },
  { path: 'historialInstructor', component: ConsultarHistorialComponent },
  { path: 'bandejaInstructor', component: BandejaInstructorComponent},
  { path: 'perfilInstructor', component: PerfilInstructorComponent },

  { path: 'inicioCoordinacion', component: CoordinacionInicioComponent }, 
  { path: 'llamadosCoordinacion', component: LlamadosCoordinacionComponent }, 
  { path: 'reportarAprendizCoordinacion', component: ReportarCoordinacionComponent},
  { path: 'felicitacionCoordinacion', component: FelicitacionCoordinacionComponent },
  { path: 'fallosCoordinacion', component: FallosCoordinacionComponent },
  { path: 'actasCoordinacion', component: ActasCoordinacionComponent },
  { path: 'bandejaCoordinacion', component: BandejaCoordinacionComponent }, 
  { path: 'perfilCoordinacion', component: PerfilCoordinacionComponent },
  { path: 'citarComite', component:CitarComiteComponent },

  { path: 'inicioAprendiz', component: InicioAprendizComponent },
  { path: 'miHistorial', component: MiHistorialComponent },
  { path: 'citacionesAprendiz', component: CitacionesAprendizComponent },
  { path: 'bandejaAprendiz', component: BandejaAprendizComponent },
  { path: 'descargosAprendiz', component: DescargosAprendizComponent }, 
  { path: 'perfilAprendiz', component: PerfilAprendizComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
