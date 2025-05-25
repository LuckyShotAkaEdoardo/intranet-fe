import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-effect-legend',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legend">
      <h2>🧩 Struttura di un effetto</h2>
      <p>
        Ogni effetto è definito da un oggetto JSON con i seguenti campi
        principali:
      </p>
      <ul>
        <li>
          <strong>type</strong>: tipo di effetto (es. <code>"DAMAGE"</code>,
          <code>"BUFF_ATTACK"</code>)
        </li>
        <li>
          <strong>trigger</strong>: quando si attiva (es.
          <code>"ON_PLAY"</code>)
        </li>
        <li>
          <strong>value</strong>: valore numerico (es. danno, cura, durata)
        </li>
        <li>
          <strong>target</strong>: bersaglio (es. <code>"SELF"</code>,
          <code>"CHOOSE_ENEMY"</code>)
        </li>
        <li><strong>mode, duration, subtype, intoCardId</strong>: opzionali</li>
      </ul>

      <h2>🎯 Target disponibili</h2>
      <ul>
        <li><code>SELF</code>: la carta stessa</li>
        <li><code>OPPONENT</code>: il giocatore avversario</li>
        <li><code>CHOOSE_ENEMY</code>: scelta manuale</li>
        <li><code>ALL_ENEMIES</code>: tutti i nemici</li>
        <li><code>RANDOM_ENEMY</code>: un nemico casuale</li>
        <li><code>CHOOSE_ANY</code>: qualsiasi bersaglio</li>
      </ul>

      <h2>⏱️ Trigger disponibili</h2>
      <ul>
        <li>
          <code>ON_PLAY</code>, <code>ON_TURN_START</code>,
          <code>ON_ATTACK</code>, <code>ON_DEATH</code>…
        </li>
      </ul>

      <h2>⚙️ Tipi di effetti</h2>
      <h4>🛡️ Difensivi</h4>
      <ul>
        <li><code>SHIELD</code>, <code>TAUNT</code>, <code>NO_HEAL</code></li>
      </ul>

      <h4>💥 Offensivi</h4>
      <ul>
        <li>
          <code>DAMAGE</code>, <code>KILL</code>, <code>BURN</code>,
          <code>FREEZE</code>
        </li>
      </ul>

      <h4>💖 Supporto</h4>
      <ul>
        <li>
          <code>HEAL</code>, <code>BUFF_ATTACK</code>, <code>SUMMON</code>,
          <code>DRAW</code>
        </li>
      </ul>

      <h2>🔍 Condizioni Target</h2>
      <ul>
        <li>
          <code>HP_LT_5</code>, <code>IS_TYPE:HERO</code>, <code>DEF_LT_3</code>
        </li>
      </ul>

      <h2>🎯 Formati del campo target</h2>
      <ol>
        <li><code>"SELF"</code> (valore singolo)</li>
        <li><code>["a1", "b2"]</code> (lista)</li>
        <li><code> condition: "IS_TYPE:HERO" </code> (condizione)</li>
      </ol>
    </div>
  `,
  styles: [
    `
      .legend {
        padding: 1rem;
        background: #fff;
        border-radius: 8px;
        font-size: 14px;
        color: #333;
      }

      h2 {
        color: #4e54c8;
        margin-top: 1.5rem;
      }

      h4 {
        margin-top: 1rem;
        font-weight: 600;
      }

      code {
        background: #eee;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: monospace;
      }

      ul,
      ol {
        padding-left: 1.5rem;
        margin-bottom: 1rem;
      }

      li {
        margin-bottom: 0.3rem;
      }
    `,
  ],
})
export class EffectLegendComponent {}
