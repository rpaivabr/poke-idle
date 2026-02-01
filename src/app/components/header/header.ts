import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  money = input.required<number>();
  energy = input.required<number>();

  isTired = computed(() => this.energy() < 10);
}
