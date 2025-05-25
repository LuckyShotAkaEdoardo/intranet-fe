import { Routes } from '@angular/router';
import { LoginComponent } from './screen/login/login.component';
import { HomeComponent } from './screen/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];
