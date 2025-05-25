import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-effect-legend',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legend">
      <section>
        <h2>🧩 Struttura di un effetto</h2>
        <p>
          Ogni effetto è definito da un oggetto JSON con i seguenti campi
          principali:
        </p>
        <ul>
          <li>
            <strong>type</strong>: il tipo di effetto (es.
            <code>"DAMAGE"</code>, <code>"FREEZE"</code>,
            <code>"BUFF_ATTACK"</code>)
          </li>
          <li>
            <strong>trigger</strong>: quando l'effetto si attiva (es.
            <code>"ON_PLAY"</code>, <code>"ON_TURN_START"</code>)
          </li>
          <li>
            <strong>value</strong>: valore numerico associato all'effetto (es.
            danno inflitto, cure, durata)
          </li>
          <li>
            <strong>target</strong>: bersaglio dell'effetto (es.
            <code>"SELF"</code>, <code>"CHOOSE_ENEMY"</code>,
            <code>"ALL_ALLIES"</code>)
          </li>
          <li>
            <strong>count</strong>: numero massimo di bersagli da colpire per
            effetti che colpiscono target multipli (es. <code>CHOOSE_ANY</code>,
            <code>RANDOM_ENEMY</code>)
          </li>
          <li>
            <strong>mode, duration, subtype, intoCardId</strong>: campi
            opzionali per effetti specifici
          </li>
        </ul>
      </section>

      <section>
        <h2>🎯 Target disponibili</h2>
        <p>
          I bersagli determinano chi o cosa è influenzato dall'effetto. Alcuni
          esempi:
        </p>
        <ul>
          <li><code>SELF</code>: la carta stessa</li>
          <li><code>OPPONENT</code>: il giocatore avversario</li>
          <li>
            <code>CHOOSE_ENEMY</code>: il giocatore sceglie manualmente un
            nemico
          </li>
          <li><code>ALL_ENEMIES</code>: tutti i nemici</li>
          <li><code>RANDOM_ENEMY</code>: un nemico casuale</li>
          <li><code>ALL_PLAYERS</code>: tutti i giocatori</li>
          <li>
            <code>CHOOSE_ANY</code>: il giocatore sceglie qualsiasi bersaglio
          </li>
        </ul>
      </section>

      <section>
        <h2>⏱️ Trigger disponibili</h2>
        <p>I trigger definiscono quando un effetto si attiva. Alcuni esempi:</p>
        <ul>
          <li><code>ON_PLAY</code>: quando la carta viene giocata</li>
          <li><code>ON_ENTER_BOARD</code>: quando la carta entra in gioco</li>
          <li><code>ON_TURN_START</code>: all'inizio del turno</li>
          <li><code>ON_TURN_END</code>: alla fine del turno</li>
          <li><code>ON_ATTACK</code>: quando la carta attacca</li>
          <li><code>ON_ATTACKED</code>: quando la carta viene attaccata</li>
          <li><code>ON_DEATH</code>: quando la carta muore</li>
        </ul>
      </section>

      <section>
        <h2>⚙️ Tipi di effetti disponibili</h2>

        <h3>🛡️ Effetti difensivi</h3>
        <ul>
          <li><code>SHIELD</code>: aggiunge uno scudo che assorbe danni</li>
          <li>
            <code>TAUNT</code>: costringe i nemici ad attaccare questa carta
          </li>
          <li>
            <code>NO_HEAL</code>: impedisce al bersaglio di ricevere cure per un
            certo numero di turni
          </li>
        </ul>

        <h3>💥 Effetti offensivi</h3>
        <ul>
          <li><code>DAMAGE</code>: infligge danno a un bersaglio</li>
          <li><code>KILL</code>: distrugge direttamente una carta</li>
          <li>
            <code>MILL</code>: fa scartare carte dal mazzo dell'avversario
          </li>
          <li><code>BURN</code>: infligge danno nel tempo</li>
          <li>
            <code>FREEZE</code>: impedisce al bersaglio di attaccare per un
            certo numero di turni
          </li>
          <li>
            <code>STUN</code>: impedisce tutte le azioni del bersaglio per un
            certo numero di turni
          </li>
          <li>
            <code>SACRIFICE</code>: distrugge una propria carta per attivare un
            effetto
          </li>
          <li>
            <code>SWAP_STATS</code>: scambia attacco e difesa di una carta
          </li>
          <li>
            <code>DELAY_DRAW</code>: impedisce al nemico di pescare alla
            prossima pesca
          </li>
          <li>
            <code>REDIRECT_DAMAGE</code>: fa ricevere il danno da una fonte a un
            altro bersaglio
          </li>
        </ul>

        <h3>💖 Effetti di supporto</h3>
        <ul>
          <li><code>HEAL</code>: cura punti vita di un giocatore o carta</li>
          <li><code>BUFF_ATTACK</code>: aumenta l'attacco di una carta</li>
          <li><code>BUFF_DEFENSE</code>: aumenta la difesa di una carta</li>
          <li>
            <code>SET_STATS</code>: imposta attacco e difesa a valori specifici
          </li>
          <li>
            <code>CRYSTALS</code>: aggiunge cristalli disponibili o massimi
          </li>
          <li><code>DRAW</code>: pesca carte dal mazzo</li>
          <li><code>SUMMON</code>: evoca creature sul campo</li>
          <li>
            <code>COPY_CARD</code>: copia una carta avversaria nella propria
            mano
          </li>
          <li><code>STEAL_CARD</code>: ruba una carta dalla mano nemica</li>
          <li>
            <code>DISCARD</code>: scarta una carta casuale dalla mano avversaria
          </li>
          <li>
            <code>RETURN_HAND</code>: rimette una carta in mano al suo
            proprietario
          </li>
          <li>
            <code>REMOVE_EFFECTS</code>: rimuove effetti passivi registrati
          </li>
          <li><code>SILENCE</code>: rimuove tutte le abilità da una carta</li>
          <li>
            <code>POLYMORPH</code>: trasforma una carta in una predefinita
          </li>
          <li>
            <code>TRANSFORM</code>: sostituisce la carta con un'altra casuale
          </li>
        </ul>

        <h3>🔍 Condizioni target (target.condition)</h3>
        <ul>
          <li><code>HP_LT_5</code>: bersagli con meno di 5 HP</li>
          <li><code>HAS_ABILITY:RUSH</code>: bersagli con abilità RUSH</li>
          <li><code>IS_TYPE:HERO</code>: bersagli di tipo HERO</li>
          <li><code>IS_FROZEN</code>: bersagli congelati</li>
          <li><code>DEF_LT_3</code>: bersagli con difesa minore di 3</li>
        </ul>

        <section>
          <h2>🎯 Il campo <code>target</code></h2>
          <p>
            Il campo <code>target</code> indica chi viene colpito o coinvolto
            dall'effetto. Può assumere 3 forme principali:
          </p>

          <h3>1️⃣ Valore singolo (stringa)</h3>
          <p>Inserisci un identificatore testuale.</p>
          <ul>
            <li><code>SELF</code>: la carta stessa</li>
            <li><code>OPPONENT</code>: il giocatore avversario</li>
            <li><code>CHOOSE_ENEMY</code>: il giocatore sceglie un nemico</li>
            <li>
              <code>CHOOSE_ANY</code>: il giocatore può scegliere qualsiasi
              bersaglio
            </li>
            <li>
              <code>ALL_ENEMIES</code>, <code>ALL_ALLIES</code>,
              <code>RANDOM_ENEMY</code>...
            </li>
          </ul>

          <h3>2️⃣ Lista di ID</h3>
          <p>Separati da virgola, senza spazi.</p>
          <pre><code>["a1","b2"]</code></pre>
          <p>
            Usa questo formato se vuoi applicare l'effetto a più carte
            specifiche.
          </p>

          <h3>3️⃣ Condizione</h3>
          <p>
            Usa una condizione logica per colpire target dinamici. Formato:
            <code>condition: "..."</code>
          </p>
          <ul>
            <li><code>HP_LT_5</code>: con meno di 5 HP</li>
            <li><code>HAS_ABILITY:WALL</code>: che hanno l'abilità WALL</li>
            <li><code>IS_TYPE:HERO</code>: solo eroi</li>
            <li><code>IS_FROZEN</code>: carte congelate</li>
          </ul>

          <h4>💡 Esempi</h4>
          <ul>
            <li><code>"SELF"</code></li>
            <li><code>["a1","b3"]</code></li>
            <li><code>"condition": "IS_TYPE:HERO"</code></li>
          </ul>

          <li>
            <strong>count</strong>: specifica quanti bersagli colpire:
            <ul>
              <li>
                <code>CHOOSE_ANY</code> con <code>count: 2</code> → il giocatore
                sceglie due carte
              </li>
              <li>
                <code>RANDOM_ENEMY</code> con <code>count: 1</code> → colpisce
                un nemico casuale
              </li>
              <li>
                <code>ALL_ALLIES</code> → ignora <code>count</code> perché
                colpisce tutti
              </li>
            </ul>
          </li>
        </section>
      </section>
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
