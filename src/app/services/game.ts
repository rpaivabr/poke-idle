import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Game {
  money = signal(50);
  energy = signal(100);
  inventory = signal<string[]>([]);

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

  buyItem(price: number, itemName: string) {
    if (this.money() >= price) {
      this.money.update(value => value - price);
      this.inventory.update(items => [...items, itemName]);
      return true;
    }
    return false;
  }
}
