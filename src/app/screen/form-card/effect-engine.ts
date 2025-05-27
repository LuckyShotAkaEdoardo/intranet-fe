import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EFFECT_METADATA } from './model';

@Component({
  selector: 'app-effect-configurator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="effect-configurator">
      <label>Tipo Effetto</label>
      <select
        [(ngModel)]="localEffect.type"
        (change)="onChange.emit(localEffect)"
      >
        <option value="">-- seleziona --</option>
        <option *ngFor="let meta of effectMetadata" [value]="meta.type">
          {{ meta.label }} ({{ meta.type }})
        </option>
      </select>

      <label>Trigger</label>
      <select
        [(ngModel)]="localEffect.trigger"
        (change)="onChange.emit(localEffect)"
      >
        <option value="">-- seleziona --</option>
        <option *ngFor="let trigger of triggerOptions" [value]="trigger">
          {{ trigger }}
        </option>
      </select>

      <ng-container *ngIf="selectedMeta">
        <!-- Gestione speciale per SUMMON -->
        <ng-container *ngIf="localEffect.type === 'SUMMON'; else defaultFields">
          <label>Modalità evocazione</label>
          <select [(ngModel)]="localEffect.mode">
            <option value="random">Casuale per tipo</option>
            <option value="pool">Da pool</option>
            <option value="fixed">Carte fisse</option>
          </select>

          <div *ngIf="localEffect.mode === 'random'">
            <label>Tipo (subtype)</label>
            <input [(ngModel)]="localEffect.subtype" />

            <label>Numero di evocazioni</label>
            <input type="number" [(ngModel)]="localEffect.value" min="1" />

            <label>Filtro (JSON)</label>
            <textarea
              [(ngModel)]="filterJson"
              (change)="updateFilterFromJson()"
            ></textarea>
          </div>

          <div *ngIf="localEffect.mode === 'pool'">
            <label>Pool di carte (id separate da virgola)</label>
            <input [(ngModel)]="poolString" (input)="updatePool()" />

            <label>Numero da evocare</label>
            <input type="number" [(ngModel)]="localEffect.value" min="1" />
          </div>

          <div *ngIf="localEffect.mode === 'fixed'">
            <label>Carte fisse da evocare (id separate da virgola)</label>
            <input [(ngModel)]="cardIdsString" (input)="updateCardIds()" />
          </div>
        </ng-container>

        <ng-template #defaultFields>
          <div *ngFor="let field of selectedMeta.fields">
            <label>{{ field }}</label>

            <ng-container [ngSwitch]="field">
              <ng-container *ngSwitchCase="'target'">
                <select [(ngModel)]="targetType">
                  <option value="PREDEFINED">Predefinito</option>
                  <option value="LIST">Lista ID</option>
                  <option value="CONDITION">Condizione</option>
                  <option value="ALL">Tutti</option>
                </select>

                <ng-container [ngSwitch]="targetType">
                  <select
                    *ngSwitchCase="'PREDEFINED'"
                    [(ngModel)]="localEffect.target"
                    (change)="onChange.emit(localEffect)"
                  >
                    <option *ngFor="let key of targetKeys" [value]="key">
                      {{ key }}
                    </option>
                  </select>

                  <input
                    *ngSwitchCase="'LIST'"
                    placeholder="c1, c2, c3"
                    (input)="handleTargetChangeFromEvent('LIST', $event)"
                  />

                  <input
                    *ngSwitchCase="'CONDITION'"
                    placeholder="LOWEST_HP / CUSTOM"
                    (input)="handleTargetChangeFromEvent('CONDITION', $event)"
                  />
                </ng-container>
              </ng-container>

              <ng-container *ngSwitchDefault>
                <input
                  type="text"
                  [value]="resolveFieldValue(field)"
                  (input)="updateNestedFieldFromEvent(field, $event)"
                />
              </ng-container>
            </ng-container>
          </div>
        </ng-template>
      </ng-container>

      <h5>Anteprima JSON</h5>
      <pre>{{ localEffect | json }}</pre>
    </div>
  `,
  styles: [
    `
      .effect-configurator {
        padding: 1rem;
        background: #f4f4f4;
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-top: 1rem;
      }

      input,
      select,
      textarea {
        width: 100%;
        padding: 6px;
        margin-top: 4px;
      }

      pre {
        background: #e0e0e0;
        padding: 0.75rem;
        font-family: monospace;
      }
    `,
  ],
})
export class EffectConfiguratorComponent implements OnInit {
  @Input() effect: any = {};
  @Output('onChange') onChange = new EventEmitter<any>();

  localEffect: any = {};
  poolString = '';
  cardIdsString = '';
  filterJson = '';
  targetType = 'PREDEFINED';
  effectMetadata = EFFECT_METADATA;

  readonly triggerOptions = [
    'ON_PLAY',
    'ON_END_TURN',
    'ON_CARD_DRAWN',
    'ON_DAMAGE_RECEIVED',
    'ON_TURN_START',
    'ON_ENTER_BOARD',
    'ON_LEAVE_BOARD',
    'ON_CARD_PLAYED',
    'ON_CARD_DESTROYED',
    'ON_CRYSTALS_GAINED',
    'ON_ATTACK',
    'ON_ATTACKED',
    'ON_DRAW_PHASE',
    'ON_TURN_END',
    'ON_DEATH',
  ];

  readonly targetOptions: Record<string, string> = {
    SELF: 'SELF',
    ALLY: 'ALLY',
    ALL_ALLIES: 'ALL_ALLIES',
    OPPONENT: 'OPPONENT',
    ENEMY_CARD: 'ENEMY_CARD',
    ALL_ENEMIES: 'ALL_ENEMIES',
    RANDOM_ENEMY: 'RANDOM_ENEMY',
    WEAKEST_ENEMY: 'WEAKEST_ENEMY',
    STRONGEST_ENEMY: 'STRONGEST_ENEMY',
    ALL_PLAYERS: 'ALL_PLAYERS',
    ALL_CARDS: 'ALL_CARDS',
    CHOOSE_ENEMY: 'CHOOSE_ENEMY',
    CHOOSE_ALLY: 'CHOOSE_ALLY',
    CHOOSE_ANY: 'CHOOSE_ANY',
  };

  get targetKeys(): string[] {
    return Object.keys(this.targetOptions);
  }

  get selectedMeta() {
    return this.effectMetadata.find((m) => m.type === this.localEffect.type);
  }

  ngOnInit() {
    this.localEffect = { ...this.effect };
    this.localEffect.mode = this.localEffect.mode || 'random';
    this.poolString = (this.localEffect.pool || []).join(', ');
    this.cardIdsString = (this.localEffect.cardIds || []).join(', ');
    this.filterJson = this.localEffect.filter
      ? JSON.stringify(this.localEffect.filter, null, 2)
      : '';
    this.onChange.emit(this.localEffect);
  }

  updateNestedField(path: string, value: any) {
    const updated = { ...this.localEffect };
    const keys = path.split('.');
    let obj = updated;

    while (keys.length > 1) {
      const key = keys.shift()!;
      obj[key] = obj[key] || {};
      obj = obj[key];
    }
    obj[keys[0]] = isNaN(value) ? value : +value;

    this.localEffect = updated;
    this.onChange.emit(this.localEffect);
  }

  updateNestedFieldFromEvent(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.updateNestedField(field, value);
  }

  resolveFieldValue(path: string): string {
    return path
      .split('.')
      .reduce(
        (acc: any, key: string) =>
          acc && acc[key] !== undefined ? acc[key] : '',
        this.localEffect
      );
  }

  handleTargetChange(type: string, input: string) {
    switch (type) {
      case 'LIST':
        this.localEffect.target = input.split(',').map((t) => t.trim());
        break;
      case 'CONDITION':
        this.localEffect.target = { condition: input };
        break;
    }
    this.onChange.emit(this.localEffect);
  }

  handleTargetChangeFromEvent(type: string, event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.handleTargetChange(type, input);
  }

  updatePool() {
    this.localEffect.pool = this.poolString.split(',').map((s) => s.trim());
    this.onChange.emit(this.localEffect);
  }

  updateCardIds() {
    this.localEffect.cardIds = this.cardIdsString
      .split(',')
      .map((s) => s.trim());
    this.onChange.emit(this.localEffect);
  }

  updateFilterFromJson() {
    try {
      this.localEffect.filter = JSON.parse(this.filterJson);
      this.onChange.emit(this.localEffect);
    } catch (err) {
      alert('❌ JSON del filtro non valido');
    }
  }
}
