import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Game {
  money = signal(50);
  energy = signal(100);

  isTired = computed(() => this.energy() < 10);
  isFullLife = computed(() => this.energy() === 100);

  constructor() {
    effect(() => {
      console.log('Dinheiro atual:', this.money());
    });
  }
  
  battle() {
    this.energy.update(value => value - 10);
    this.money.update(value => value + 20);
  }

  heal() {
    this.energy.set(100);
  }
}
