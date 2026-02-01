# ⚡ Workshop Angular: PokéIdle

Bem-vindo ao workshop! Hoje vamos construir o **PokéIdle**, um jogo onde você gerencia recursos, batalha e compra itens.
O objetivo é entender como o **Angular** funciona na prática.

**Conceitos:** Signals, Components, Services, Routing, HTTP e Control Flow.

## 🚀 Preparação (Setup)

No terminal do seu ambiente, vamos criar os arquivos necessários conforme avançamos.
Se estiver rodando localmente (em casa), o comando para criar um novo projeto é:
`ng new pokeidle --style=css --routing --ssr=false --ai-config=none`

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
    // TODO: Só batalha se tiver energia. Custa 10 de energia, ganha dinheiro aleatório (entre 15 e 25).
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
No `AppComponent`, o HTML deve ficar limpo assim:

```html
<div class="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
  <!-- O Pai (App) passa os dados para o Filho (Header) via [property] -->
  <app-header 
    [money]="money()" 
    [energy]="energy()" />

  <!-- O Filho (Gym) avisa o pai via (event) -->
  <app-gym 
    [energy]="energy()"
    (battleRequest)="battle()" />

  <app-center (healRequest)="heal()" />
</div>
```

### 2.2 Exemplo: Gym Component (`components/gym/gym.component.ts`)

```typescript
import { Component, input, output } from '@angular/core';

@Component({ ... })
export class GymComponent {
  // Recebe energia do pai (obrigatório)
  energy = input.required<number>();
  
  // Cria um evento para avisar o pai
  battleRequest = output();

  onBattleClick() {
    this.battleRequest.emit();
  }
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

### 3.1 Game Service (`services/game.service.ts`)

Mova a lógica (`money`, `energy`, `battle()`, `heal()`) do `AppComponent` para cá.

### 3.2 Configurando Rotas (`app.routes.ts`)

```typescript
export const routes: Routes = [
  { path: 'gym', component: GymComponent },
  { path: 'center', component: CenterComponent },
  { path: '', redirectTo: 'gym', pathMatch: 'full' }
  // Adicione novas rotas aqui se criar novos componentes
];
```

### 3.3 Atualizando os Componentes

Agora os componentes não recebem mais `@Input` do pai. Eles devem injetar o serviço diretamente!

```typescript
// Exemplo no GymComponent
game = inject(GameService);
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

### 4.1 Configuração Global (`app.config.ts`)

Adicione `provideHttpClient()` nos providers.

### 4.2 Mart Logic (`components/mart/mart.component.ts`)

```typescript
export class MartComponent {
  http = inject(HttpClient);
  game = inject(GameService); // Para gastar dinheiro

  items = signal<any[]>([]); // Lista de itens
  loading = signal(true);

  constructor() {
    this.fetchItems();
  }

  fetchItems() {
    // URL: https://pokeapi.co/api/v2/item?limit=10
    // DICA: Use this.http.get(...).subscribe(...)
    // DICA: Ao terminar, set loading para false
  }

  buy(item: any) {
    // Valide se tem dinheiro e chame o service
  }
}
```

## 🔎 Passo 5 (Bônus): Filtros com Computed

**Objetivo:** Adicionar uma busca na loja que filtra os itens instantaneamente.

**Teoria:**

* **Computed Signal:** Se o texto da busca mudar OU a lista mudar, o filtro atualiza sozinho.

### 5.1 Lógica

```typescript
// No MartComponent
searchText = signal('');

// Substitua o items = signal([]) por:
allItems = signal<any[]>([]);

// O computed mágico
filteredItems = computed(() => {
  const term = this.searchText().toLowerCase();
  return this.allItems().filter(i => i.name.includes(term));
});
```

### 5.2 HTML

Adicione um input no topo da loja:

```html
<input 
  #search
  (input)="searchText.set(search.value)"
  placeholder="Buscar item..."
  class="w-full p-2 border rounded mb-4"
>

<!-- Mude o loop @for para usar filteredItems() -->
```

## ✨ O Toque Final (CSS Mágico)

Para ver a mágica acontecer e o layout ficar moderno instantaneamente, vá até o arquivo `index.html` e adicione esta linha dentro da tag `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

**Parabéns! Você criou uma aplicação Angular Reativa completa!** 🚀