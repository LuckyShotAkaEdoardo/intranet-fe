// ability-engine.ts

import { signal } from '@angular/core';

export const ABILITIES = [
  'CHARGE',
  'STEALTH',
  'LIFESTEAL',
  'DIVINE_SHIELD',
  'TAUNT',
  'ANTI_SHIELD',
] as const;

export type Ability = (typeof ABILITIES)[number];

export const ABILITY_LABELS: Record<Ability, string> = {
  CHARGE: 'Attacca subito',
  STEALTH: 'Invisibile finché non attacca',
  LIFESTEAL: 'Recupera salute infliggendo danno',
  DIVINE_SHIELD: 'Assorbe il primo danno ricevuto',
  TAUNT: 'Deve essere attaccata per prima',
  ANTI_SHIELD: 'Ignora le barriere',
};

export const ABILITY_ICONS: Record<Ability, string> = {
  CHARGE: '⚡',
  STEALTH: '🕵️',
  LIFESTEAL: '💉',
  DIVINE_SHIELD: '🛡️',
  TAUNT: '🎯',
  ANTI_SHIELD: '💥',
};

export function hasAbility(
  card: { abilities?: string[] },
  ability: Ability
): boolean {
  return Array.isArray(card?.abilities) && card.abilities.includes(ability);
}

// Signal per gestire una lista dinamica di abilità selezionate
export const selectedAbilities = signal<Ability[]>([]);

export function addAbility(ability: Ability) {
  const current = selectedAbilities();
  if (!current.includes(ability)) {
    selectedAbilities.set([...current, ability]);
  }
}

export function removeAbility(ability: Ability) {
  const current = selectedAbilities();
  selectedAbilities.set(current.filter((a) => a !== ability));
}

export const EFFECT_METADATA = [
  {
    type: 'DAMAGE',
    label: 'Danno',
    fields: ['value', 'target', 'count'],
    description: 'Infligge danno a uno o più bersagli',
  },
  {
    type: 'HEAL',
    label: 'Cura',
    fields: ['value', 'target', 'count'],
    description: 'Cura uno o più bersagli',
  },
  {
    type: 'KILL',
    label: 'Uccidi',
    fields: ['target', 'count'],
    description: 'Distrugge una o più carte',
  },
  {
    type: 'FREEZE',
    label: 'Congela',
    fields: ['value', 'target', 'count'],
    description: 'Congela uno o più bersagli per N turni',
  },
  {
    type: 'STUN',
    label: 'Stordisci',
    fields: ['value', 'target', 'count'],
    description: 'Impedisce le azioni per N turni',
  },
  {
    type: 'BUFF_ATTACK',
    label: 'Buff Attacco',
    fields: ['value', 'target', 'count'],
    description: 'Aumenta l’attacco delle carte selezionate',
  },
  {
    type: 'BUFF_DEFENSE',
    label: 'Buff Difesa',
    fields: ['value', 'target', 'count'],
    description: 'Aumenta la difesa delle carte selezionate',
  },
  {
    type: 'SILENCE',
    label: 'Silenzia',
    fields: ['target', 'count'],
    description: 'Rimuove le abilità di uno o più bersagli',
  },
  {
    type: 'BURN',
    label: 'Brucia',
    fields: ['value', 'duration', 'target', 'count'],
    description: 'Infligge danno nel tempo a uno o più bersagli',
  },
  {
    type: 'SET_STATS',
    label: 'Set Statistiche',
    fields: ['value.attack', 'value.defense', 'target', 'count'],
    description: 'Imposta attacco e difesa di uno o più bersagli',
  },
  {
    type: 'POLYMORPH',
    label: 'Polimorfa',
    fields: ['target', 'count', 'intoCardId'],
    description: 'Trasforma una o più carte in una predefinita',
  },
  {
    type: 'TRANSFORM',
    label: 'Trasforma',
    fields: ['target', 'count', 'subtype'],
    description: 'Sostituisce la carta con una nuova casuale di tipo specifico',
  },
  {
    type: 'REMOVE_EFFECTS',
    label: 'Rimuovi Effetti',
    fields: ['target', 'count'],
    description: 'Disattiva gli effetti passivi attivi',
  },
  {
    type: 'CRYSTALS',
    label: 'Cristalli',
    fields: ['value', 'mode'],
    description: 'Aggiunge cristalli disponibili o massimi',
  },
  {
    type: 'DRAW',
    label: 'Pesca',
    fields: ['value'],
    description: 'Pesca un numero di carte dal mazzo',
  },
  {
    type: 'SUMMON',
    label: 'Evoca',
    fields: ['value', 'subtype'],
    description: 'Evoca creature casuali sul campo',
  },
  {
    type: 'COPY_CARD',
    label: 'Copia Carta',
    fields: ['target'],
    description: 'Copia una carta nemica nella propria mano',
  },
  {
    type: 'STEAL_CARD',
    label: 'Ruba Carta',
    fields: [],
    description: 'Ruba la prima carta della mano nemica',
  },
  {
    type: 'DISCARD',
    label: 'Scarta',
    fields: ['value'],
    description: 'Fa scartare carte dalla mano nemica',
  },
  {
    type: 'RETURN_HAND',
    label: 'Torna in Mano',
    fields: ['target'],
    description: 'Riporta una carta in mano al suo proprietario',
  },
  {
    type: 'TAUNT',
    label: 'Provocazione',
    fields: ['target'],
    description: 'Costringe i nemici ad attaccare questa carta',
  },
  {
    type: 'SHIELD',
    label: 'Scudo',
    fields: ['value', 'target'],
    description: 'Aggiunge uno scudo che assorbe danni',
  },
  {
    type: 'NO_HEAL',
    label: 'Blocca Cure',
    fields: ['target', 'duration'],
    description: 'Impedisce al bersaglio di ricevere cure',
  },
  {
    type: 'SACRIFICE',
    label: 'Sacrifica',
    fields: ['target'],
    description: 'Distrugge una propria carta per attivare un effetto',
  },
  {
    type: 'SWAP_STATS',
    label: 'Scambia Statistiche',
    fields: ['target'],
    description: 'Scambia attacco e difesa di una carta',
  },
  {
    type: 'DELAY_DRAW',
    label: 'Ritarda Pesca',
    fields: ['target'],
    description: 'Impedisce la prossima pesca al bersaglio',
  },
  //   {
  //     type: "REDIRECT_DAMAGE",
  //     label: "Reindirizza Danno",
  //     fields: ["source", "newTarget"],
  //     description: "Reindirizza i danni da una fonte verso un altro bersaglio",
  //   },
];
