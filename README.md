# ⚡ Workshop Angular: PokéIdle

Bem-vindo ao workshop! Hoje vamos construir o **PokéIdle**, um jogo onde você gerencia recursos, batalha e compra itens.
O objetivo é entender como o **Angular** funciona na prática.

**Conceitos:** Signals, Components, Services, Routing, HTTP e Control Flow.

### Links Úteis:
[Firebase Studio](https://idx.google.com/)
[Angular Documentation](https://angular.dev/)

## 🚀 Preparação (Setup)

No terminal do seu ambiente, vamos criar os arquivos necessários conforme avançamos.
Se estiver rodando localmente (em casa), o comando para criar um novo projeto é:
`ng new pokeidle --style=css --routing --ssr=false --ai-config=none`

#### ✨ O Toque Especial (CDN Tailwind)

Para ver a mágica acontecer e o layout ficar moderno instantaneamente, vá até o arquivo `index.html` e adicione esta linha dentro da tag `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

## 🐣 Passo 1: O Monolito (Signals e Eventos)

**Objetivo:** Criar a lógica básica de batalha e cura em um único arquivo para entender a reatividade.

**Teoria:**

* **Signal:** Uma caixa que guarda um valor e avisa quando muda.

* **Interpolation `{{ }}`:** Passa valor para o html.

* **Property Binding `[disabled]`:** Passa valor para o html (atributo).

* **Event Binding `(click)`:** Reage a ações.

### 1.1 Código Base (`app.ts`)

Copie este código. Note que os métodos estão vazios. **Sua missão é fazer a lógica funcionar.**

```typescript
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
    // TODO: Só batalha se tiver energia. Custa 10 de energia, ganha 20 money.
  }

  heal() {
    // TODO: Recupera energia para 100.
  }
}
```

### 1.2 O HTML (`app.html`)

Já deixamos as classes de estilo prontas. Focaremos nas marcações do Angular (`@if`, `{{ }}`).

```html
<div class="max-w-md mx-auto p-4 bg-gray-50 min-h-screen font-sans selection:bg-red-200 text-slate-900">
  
  <!-- HEADER -->
  <header class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-6">
    <h1 class="font-black text-xl italic text-slate-800">
      <span class="text-red-500">Poké</span>Idle
    </h1>
    <div class="flex gap-2">
      <!-- TODO: Mostre o valor dos signals money e energy aqui -->
      <div 
        class="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2">
        <span class="text-lg">💰</span>
        <span class="font-mono font-bold text-slate-700">0</span>
      </div>
      <div 
        class="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2">
        <span class="text-lg">⚡</span>
        <!-- TODO: Adicionar classes text-red-500 dinamicamente na div se estiver cansado (isTired) -->
        <span class="font-mono font-bold text-slate-700">0</span>
      </div>
    </div>
  </header>

  <!-- ÁREA DE BATALHA -->
  <div class="bg-white p-6 rounded-xl shadow-sm text-center mb-4">
    <h2 class="text-2xl font-bold text-slate-800 mb-1">Arena de Treino</h2>
    <p class="text-slate-500 text-sm mb-6">Treine para ganhar PokéDólares!</p>
  
    <div class="mb-4 flex justify-center relative">
      <div class="absolute inset-0 bg-pink-100 rounded-full scale-75 blur-xl opacity-50"></div>
      <!--TODO: pode trocar o pokemon. ex: 1 bulbasauro 4 charmander 7 squirtle -->
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif" class="h-32 mb-4 relative">
    </div>
    
    <!-- TODO: Use @if para desabilitar ou esconder o botão se estiver cansado (isTired) -->
    <button 
      (click)="battle()"
      class="mb-4 w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition disabled:bg-gray-300">
      Batalhar (-10 ⚡)
    </button>
    
    <div class="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded text-left" role="alert">
      <p class="font-bold">Pokémon Exausto!</p>
      <p class="text-sm">Vá ao Centro Pokémon para descansar.</p>
    </div>
  </div>

  <!-- ÁREA DE CURA -->
  <div class="bg-white p-6 rounded-xl shadow-sm text-center">
    <h2 class="text-2xl font-bold text-pink-500 mb-1">Centro Pokémon</h2>
    <p class="text-slate-500 text-sm mb-6">A Enfermeira Joy está esperando.</p>

    <div class="mb-4 flex justify-center relative">
      <div class="absolute inset-0 bg-pink-100 rounded-full scale-75 blur-xl opacity-50"></div>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/113.gif" class="h-28 relative z-10" alt="Chansey">
    </div>

    <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
      <div class="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase">
        <span>Energia do Time</span>
        <span>{{ energy() }}</span>
      </div>
      <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div 
          class="h-full transition-all duration-1000 ease-out relative"
          [class]="energy() > 50 ? 'bg-green-500' : energy() > 20 ? 'bg-yellow-400' : 'bg-red-500'"
          [style.width.%]="energy()">
          <div class="absolute inset-0 bg-white opacity-20 w-full animate-pulse"></div>
        </div>
      </div>
    </div>

    <button 
      (click)="heal()"
      class="w-full font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
      [class]="isFullLife()
        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
        : 'bg-pink-500 hover:bg-pink-600 text-white hover:shadow-lg active:translate-y-0.5'">
      <span>{{ isFullLife() ? 'Energia Cheia' : '💖 Recuperar Saúde' }}</span>
    </button>
  </div>

</div>
```

## 🧩 Passo 2: Componentização

**Objetivo:** Quebrar o App em pedaços menores (Header, Gym, Center) para organizar o código.

**Comandos:**

```bash
ng g c components/header
ng g c components/gym
ng g c components/center
```

**Conceitos:**

* `input()`: O pai manda dados para o filho.

* `output()`: O filho avisa o pai que algo aconteceu.

### 2.1 Refatorando

Mova o HTML correspondente para cada componente novo.
No componente `App`, o HTML deve ficar limpo assim:

```html
<div class="max-w-md mx-auto p-4 bg-gray-50 min-h-screen font-sans selection:bg-red-200 text-slate-900">
  <!-- O pai (App) passa os dados para o filho (header) via [property]-->
  <app-header [money]="money()" [energy]="energy()" />
  <!-- o filho (Gym) avisa o pai via (event)-->
  <app-gym [energy]="energy()" (battleRequest)="battle()" />
  <app-center [energy]="energy()" (healRequest)="heal()" />
</div>
```

### 2.2 Exemplo: Gym Component (`components/gym/gym.ts`)

```typescript
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-gym',
  imports: [],
  templateUrl: './gym.html',
  styleUrl: './gym.css',
})
export class Gym {
  // Recebe energia do pai (obrigatório)
  energy = input.required<number>();
  // Cria um evento para avisar o pai
  battleRequest = output<void>();

  isTired = computed(() => this.energy() < 10);
}
```

## 🛣️ Passo 3: Rotas e Serviços

**Objetivo:** Criar navegação real e tirar o estado do componente visual.

**Comandos:**

```bash
ng g s services/game
ng g c components/navbar
```

**Teoria:**

* **Service:** Singleton (existe apenas 1 instância) onde guardamos a lógica real.

* **Router:** Troca o componente visível baseado na URL.

### 3.1 Navbar Component (`components/navbar.ts`)

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
```

```html
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-40">
  <div class="max-w-md mx-auto flex justify-around p-2">
    <a routerLink="/gym" routerLinkActive="text-red-600 bg-red-50"
      class="flex-1 text-center p-2 rounded-xl text-slate-400 transition-all active:scale-95 flex flex-col items-center gap-1">
      <span class="text-2xl">🥊</span>
      <span class="text-[10px] font-bold uppercase tracking-wide">Ginásio</span>
    </a>
    <a routerLink="/mart" routerLinkActive="text-blue-600 bg-blue-50"
      class="flex-1 text-center p-2 rounded-xl text-slate-400 transition-all active:scale-95 flex flex-col items-center gap-1">
      <span class="text-2xl">🛒</span>
      <span class="text-[10px] font-bold uppercase tracking-wide">Loja</span>
    </a>
    <a routerLink="/center" routerLinkActive="text-pink-600 bg-pink-50"
      class="flex-1 text-center p-2 rounded-xl text-slate-400 transition-all active:scale-95 flex flex-col items-center gap-1">
      <span class="text-2xl">🏥</span>
      <span class="text-[10px] font-bold uppercase tracking-wide">Centro</span>
    </a>
  </div>
</nav>
```

### 3.2 Configurando Rotas (`app.routes.ts`)

```typescript
export const routes: Routes = [
  { path: 'gym', component: Gym },
  { path: 'center', component: Center},
  { path: '**', redirectTo: '/gym' },
  // Adicione novas rotas aqui se criar novos componentes
];
```

### 3.3 Game Service (`services/game.ts`)

Mova a lógica (`money`, `energy`, `battle()`, `heal()`, etc.) do componente `App` para cá.

### 3.4 Atualizando os Componentes

Agora os componentes não recebem mais `input()` do pai. Eles devem injetar o serviço diretamente!

```typescript
// Exemplo no componente Gym
game = inject(Game);
// No HTML: {{ game.energy() }}
```

## 🛒 Passo 4: PokéMart (HTTP e API)

**Objetivo:** Consumir dados reais da PokéAPI e criar a loja.

**Comandos:**

```bash
ng g c components/mart
```

**Teoria:**

* **HttpClient:** Faz chamadas AJAX.

* **Async:** Dados da web demoram. Precisamos lidar com "Loading".

### 4.1 Mart Component (`components/mart.ts`)

```typescript
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
```

```html
<div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-20 animate-fade-in">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-blue-600">PokéMart</h2>
    </div>

    @if (loading()) {
      <div class="text-center py-10 text-slate-400 flex flex-col items-center">
        <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-2"></div>
        <p>Carregando catálogo...</p>
      </div>
    }

    <div class="grid grid-cols-2 gap-3 mb-6">
      @for (item of items(); track item.name) {
        <div class="border border-slate-100 rounded-lg p-3 flex flex-col items-center transition bg-slate-50 relative overflow-hidden group">
          <img [src]="item.image" class="w-12 h-12 mb-2" />
          
          <h3 class="font-bold text-slate-700 capitalize text-xs mb-1 truncate w-full text-center">{{ item.name }}</h3>
          <span class="text-green-600 font-bold mb-2 text-sm">💰 {{ item.price }}</span>
          
          <button 
            class="w-full py-1.5 px-2 rounded text-[10px] font-bold uppercase tracking-wider transition-all text-slate-400"
            [class]="game.money() >= item.price ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-200'"
            [disabled]="game.money() < item.price"
            (click)="game.buyItem(item.price, item.name)">
            {{ game.money() >= item.price ? 'Comprar' : 'Sem Grana' }}
          </button>
        </div>
      }
    </div>

    <div class="border-t pt-4 border-slate-100">
      <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Sua Mochila ({{ game.inventory().length }})</h3>
      <div class="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
        @for (item of game.inventory(); track $index) {
          <span class="bg-slate-800 text-white text-[10px] py-1 px-2 rounded-full capitalize flex items-center gap-1 animate-pop-in">
            <span>🛍️</span> {{ item }}
          </span>
        } @empty {
          <span class="text-slate-400 text-sm italic w-full text-center py-2">Mochila vazia...</span>
        }
      </div>
    </div>
  </div>
```


**Parabéns! Você criou uma aplicação Angular Reativa completa!** 🚀