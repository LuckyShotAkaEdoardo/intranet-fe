// ability-selector.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ABILITIES, ABILITY_LABELS, Ability } from './model';

@Component({
  selector: 'app-ability-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ability-selector">
      <div *ngFor="let ability of abilities; let i = index" class="ability-row">
        <select [(ngModel)]="abilities[i]" (ngModelChange)="emitChange()">
          <option *ngFor="let option of availableOptions(i)" [value]="option">
            {{ ABILITY_LABELS[option] || option }}
          </option>
        </select>
        <button type="button" (click)="remove(i)">✖</button>
      </div>
      <button type="button" (click)="add()">+ Aggiungi Abilità</button>
    </div>
  `,
  styles: [
    `
      .ability-selector {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .ability-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      select {
        flex: 1;
        padding: 4px;
      }
    `,
  ],
})
export class AbilitySelectorComponent {
  @Input() abilities: Ability[] = [];
  @Output() abilitiesChange = new EventEmitter<Ability[]>();

  ABILITY_LABELS = ABILITY_LABELS;

  add() {
    const next = ABILITIES.find((a) => !this.abilities.includes(a));
    if (next) {
      this.abilities.push(next);
      this.emitChange();
    }
  }

  remove(index: number) {
    this.abilities.splice(index, 1);
    this.emitChange();
  }

  emitChange() {
    this.abilitiesChange.emit([...this.abilities]);
  }
  updateAbility(index: number, value: string) {
    this.abilities[index] = value as any;
    this.abilitiesChange.emit(this.abilities);
  }
  availableOptions(index: number): Ability[] {
    const taken = this.abilities.filter((_, i) => i !== index);
    return ABILITIES.filter(
      (a) => !taken.includes(a) || a === this.abilities[index]
    );
  }
}
