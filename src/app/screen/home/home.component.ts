import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PasswordModalComponent } from '../password-modal/password.modal';
import { FormCardComponent } from '../form-card/form-card';
import { EffectLegendComponent } from '../form-card/effect-legends';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PasswordModalComponent,
    FormCardComponent,
    EffectLegendComponent,
  ],
  template: `
    <div class="home-container">
      <h2>Benvenuto {{ username }}</h2>

      <app-password-modal
        [visible]="showModal"
        [username]="username"
        (close)="showModal = false"
      />

      <app-form-card />
      <app-effect-legend />
    </div>
  `,
  styles: [
    `
      .home-container {
        padding: 1rem;
        background-color: #f9fafb;
      }

      h2 {
        text-align: center;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class HomeComponent {
  private route = inject(ActivatedRoute);
  username: string = 'Utente';
  showModal = false;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || 'Utente';
      this.showModal = params['forceChange'] === 'true';
    });
  }
}
