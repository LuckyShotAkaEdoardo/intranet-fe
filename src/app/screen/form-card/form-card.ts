import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EffectConfiguratorComponent } from './effect-engine';
import { AbilitySelectorComponent } from './ability-engine';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    EffectConfiguratorComponent,
    AbilitySelectorComponent,
  ],
  template: `
    <div class="container">
      <h2>Gestione Carte</h2>

      <form (ngSubmit)="handleSubmit()" *ngIf="formData">
        <label>ID</label>
        <input [(ngModel)]="formData.id" name="id" />

        <label>Nome</label>
        <input [(ngModel)]="formData.name" name="name" />
        <label> Visibile </label>
        <input
          type="checkbox"
          [(ngModel)]="formData.isVisibile"
          name="isVisibile"
        />

        <label>Tipo</label>
        <select [(ngModel)]="formData.type" name="type">
          <option value="HERO">HERO</option>
          <option value="MAGIC">MAGIC</option>
        </select>

        <label>Attacco</label>
        <input [(ngModel)]="formData.attack" name="attack" type="number" />

        <label>Difesa</label>
        <input [(ngModel)]="formData.defense" name="defense" type="number" />

        <label>Costo</label>
        <input [(ngModel)]="formData.cost" name="cost" type="number" />

        <label>Nome Immagine</label>
        <input [(ngModel)]="formData.image" name="image" />

        <label>Descrizione</label>
        <textarea
          [(ngModel)]="formData.description"
          name="description"
        ></textarea>

        <!-- <label>Abilità (virgola separate)</label>
        <input
          [value]="(formData.abilities || []).join(', ')"
          (input)="handleAbilitiesChange($event)"
        /> -->
        @if(loadingEdit){
        <label>Abilità</label>
        <app-ability-selector
          [abilities]="formData.abilities"
          (abilitiesChange)="formData.abilities = $event"
        />
        <label>Effetto</label>
        <app-effect-configurator
          [effect]="formData.effect"
          (onChange)="updateEffectJson($event)"
        />
        }

        <button type="submit" [disabled]="loading">Salva Carta</button>
      </form>

      <h3>Carte esistenti</h3>
      <div *ngFor="let card of cards" class="card-row">
        {{ card.id }} - {{ card.name }} ({{ card.type }})
        <button (click)="editCard(card)">✏️</button>
      </div>

      <h4>Anteprima effetto</h4>
      <pre>{{ effectPreview }}</pre>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 1rem;
        background: #f9fafb;
      }

      input,
      select,
      textarea {
        display: block;
        width: 100%;
        margin-bottom: 12px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }

      button {
        margin-top: 1rem;
        padding: 10px 16px;
      }

      .card-row {
        background: #fff;
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
      }

      pre {
        background: #eee;
        padding: 10px;
        border-radius: 6px;
        font-family: monospace;
      }
    `,
  ],
})
export class FormCardComponent implements OnInit {
  API_URL = 'https://intranet-be.onrender.com/cards';

  cards: any[] = [];
  formData: any = {
    id: '',
    name: '',
    isVisibile: false,
    type: 'HERO',
    attack: 0,
    defense: 0,
    cost: 0,
    image: '',
    description: '',
    abilities: [] as string[],
    effect: {},
  };
  effectPreview = '{}';
  loading = false;
  abilities: string[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (data) => (this.cards = data),
      error: () => alert('Errore nel caricamento carte'),
    });
  }
  loadingEdit = true;
  editCard(card: any) {
    this.loadingEdit = false;

    this.formData = {
      ...card,
      effect: card.effect || {}, // usa direttamente effect singolo
      abilities: card.abilities || [], // corregge anche le abilità
    };
    console.log(this.formData);
    this.effectPreview = JSON.stringify(this.formData.effect, null, 2);

    setTimeout(() => {
      this.loadingEdit = true;
    }, 200);
  }

  updateEffectJson(updatedEffect: any) {
    this.formData.effect = updatedEffect;
    this.effectPreview = JSON.stringify(updatedEffect, null, 2);
  }

  handleAbilitiesChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.formData.abilities = val
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
  }

  handleSubmit() {
    if (!this.formData.abilities) {
      this.formData.abilities = [];
    }

    const payload = {
      ...this.formData,
      attack: Number(this.formData.attack),
      defense: Number(this.formData.defense),
      cost: Number(this.formData.cost),
    };

    this.loading = true;
    this.http.put(`${this.API_URL}/${payload._id}`, payload).subscribe({
      next: () => {
        alert('Carta aggiornata con successo ✅');
        this.loadCards();
      },
      error: () => alert('Errore durante il salvataggio ❌'),
      complete: () => (this.loading = false),
    });
  }
}
