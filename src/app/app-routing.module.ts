import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'create-cancha',
    loadChildren: () => import('./pages/create-cancha/create-cancha.module').then( m => m.CreateCanchaPageModule)
  },
  {
    path: 'canchas',
    loadChildren: () => import('./pages/canchas/canchas.module').then( m => m.CanchasPageModule)
  },
  {
    path: 'canchas-ubication',
    loadChildren: () => import('./pages/canchas-ubication/canchas-ubication.module').then( m => m.CanchasUbicationPageModule)
  },
  {
    path: 'reserve-cancha/:name',
    loadChildren: () => import('./pages/reserve-cancha/reserve-cancha.module').then( m => m.ReserveCanchaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
