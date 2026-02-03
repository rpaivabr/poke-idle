import { Routes } from '@angular/router';
import { Gym } from './components/gym/gym';
import { Center } from './components/center/center';
import { Mart } from './components/mart/mart';

export const routes: Routes = [
  { path: 'gym', component: Gym },
  { path: 'center', component: Center },
  { path: 'mart', component: Mart },
  { path: '**', redirectTo: '/gym' },
];
