import { Component, signal, computed, effect } from '@angular/core';
import { Header } from './components/header/header';
import { Gym } from './components/gym/gym';
import { Center } from "./components/center/center";

@Component({
  selector: 'app-root',
  imports: [Header, Gym, Center],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  money = signal(50);
  energy = signal(100);
 
  isTired = computed(() => this.energy() < 10);
  isFullLife = computed(() => this.energy() === 100);

  logEffect = effect(() => {
    console.log('Dinheiro atual:', this.money());
    console.log('Energia atual:', this.energy());
  });
  
  battle() {
    const randomNumberBetween0and10 = Math.floor(Math.random() * 11);
    this.money.update(value => value + 15 + randomNumberBetween0and10);
    this.energy.update(value => value - 10);
  }

  heal() {
    this.energy.set(100);
  }
}