import { Component, inject } from '@angular/core';
import { Game } from '../../services/game';

@Component({
  selector: 'app-center',
  imports: [],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  game = inject(Game);
}
