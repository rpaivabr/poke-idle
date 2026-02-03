import { Component, inject } from '@angular/core';
import { Game } from '../../services/game';

@Component({
  selector: 'app-gym',
  imports: [],
  templateUrl: './gym.html',
  styleUrl: './gym.css',
})
export class Gym {
  game = inject(Game);
}
