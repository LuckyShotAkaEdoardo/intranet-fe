import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        [(ngModel)]="username"
        [disabled]="loading"
      />
      <input
        type="password"
        placeholder="Password"
        [(ngModel)]="password"
        [disabled]="loading"
      />

      <button (click)="login()" [disabled]="loading">
        {{ loading ? 'Login in corso...' : 'Entra' }}
      </button>

      <div *ngIf="loading" class="spinner"></div>
    </div>
  `,
  styles: [
    `
      .login-container {
        max-width: 400px;
        margin: auto;
        padding: 2rem;
        text-align: center;
      }

      input {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
      }

      button {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }

      .spinner {
        margin-top: 1rem;
        width: 24px;
        height: 24px;
        border: 3px solid #ccc;
        border-top: 3px solid #333;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-left: auto;
        margin-right: auto;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      alert('Inserisci username e password');
      return;
    }

    this.loading = true;

    this.http
      .post('https://intranet-be.onrender.com/auth/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error: () => {
          alert('Credenziali non valide');
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
