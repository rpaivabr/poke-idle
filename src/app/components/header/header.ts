import { Component, inject } from '@angular/core';
import { Game } from '../../services/game';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  game = inject(Game);
}
