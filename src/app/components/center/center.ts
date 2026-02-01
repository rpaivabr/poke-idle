import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-center',
  imports: [],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  energy = input.required<number>();
  healRequest = output<void>();

  isFullLife = computed(() => this.energy() === 100);
}
