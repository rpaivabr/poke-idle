import { httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { Game } from '../../services/game';

type ApiResponse = {
  results: ItemResult[];
}

type ItemResult = {
  name: string;
  url: string;
}

type Item = {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-mart',
  imports: [],
  templateUrl: './mart.html',
  styleUrl: './mart.css',
})
export class Mart {
  game = inject(Game);
  apiData = httpResource<ApiResponse>(() => 'https://pokeapi.co/api/v2/item?limit=6&offset=5');
  items = computed(() => this.apiData.value()?.results.map((r: ItemResult, i: number) => ({
    name: r.name.replace('-', ' '),
    price: (i + 1) * 35,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${r.name}.png`
  } as Item)));
  loading = computed(() => this.apiData.isLoading())
}
