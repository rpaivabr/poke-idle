import { Routes } from '@angular/router';
import { Gym } from './components/gym/gym';
import { Center } from './components/center/center';

export const routes: Routes = [
  { path: 'gym', component: Gym },
  { path: 'center', component: Center },
  { path: '**', redirectTo: '/gym' },
  // Adicione novas rotas aqui se criar novos componentes
];
