import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-gym',
  imports: [],
  templateUrl: './gym.html',
  styleUrl: './gym.css',
})
export class Gym {
  energy = input.required<number>();
  battleRequest = output<void>();

  isTired = computed(() => this.energy() < 10);
}
