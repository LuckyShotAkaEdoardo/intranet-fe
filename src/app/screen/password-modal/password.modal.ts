import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="overlay" *ngIf="visible">
      <div class="modal">
        <h2>Cambia password</h2>

        <input
          type="password"
          placeholder="Nuova password"
          [(ngModel)]="newPassword"
        />
        <input
          type="password"
          placeholder="Conferma password"
          [(ngModel)]="confirmPassword"
        />

        <div class="actions">
          <button (click)="onClose.emit()">Annulla</button>
          <button (click)="submit()" [disabled]="loading">
            {{ loading ? 'Attendi...' : 'Salva' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      .modal {
        background: white;
        padding: 24px;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
      }

      input {
        width: 100%;
        margin-bottom: 12px;
        padding: 8px;
        border-bottom: 1px solid #ccc;
      }

      .actions {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class PasswordModalComponent {
  @Input() visible = false;
  @Input() username = '';

  @Output('onClose') onClose = new EventEmitter<void>();

  newPassword = '';
  confirmPassword = '';
  loading = false;

  constructor(private http: HttpClient) {}

  submit() {
    if (!this.newPassword || !this.confirmPassword) {
      alert('Inserisci entrambi i campi');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Le password non coincidono');
      return;
    }

    this.loading = true;

    this.http
      .post('https://intranet-be.onrender.com/auth/change-password', {
        username: this.username,
        newPassword: this.newPassword,
      })
      .subscribe({
        next: () => {
          alert('Password cambiata con successo');
          this.newPassword = '';
          this.confirmPassword = '';
          this.onClose.emit();
        },
        error: () => {
          alert('Errore durante il cambio password');
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
