import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Defina os estados iniciais aqui (ex: money = signal(50))
  money = signal(50);
  energy = signal(100);
  
  // Crie um computed signal para saber se está cansado ou vida cheia
  isTired = computed(() => this.energy() < 10);
  isFullLife = computed(() => this.energy() === 100);

  // Use um effect para logar no console quando o dinheiro mudar
  logEffect = effect(() => {
    console.log('Dinheiro atual:', this.money());
  });
  
  battle() {
    // TODO: Só batalha se tiver energia. Custa 10 de energia, ganha dinheiro aleatório (entre 15 e 25).
  }

  heal() {
    // TODO: Recupera energia para 100.
  }
}