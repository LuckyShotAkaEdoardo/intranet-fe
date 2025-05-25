import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="login-container">
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        [(ngModel)]="username"
        class="input"
      />
      <input
        type="password"
        placeholder="Password"
        [(ngModel)]="password"
        class="input"
      />

      <button (click)="login()">Login</button>
    </div>
  `,
  styles: [
    `
      .login-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .input {
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 6px;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
    `,
  ],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post<any>('https://intranet-be.onrender.com/auth/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (data) => {
          if (data.forceChange) {
            alert('Login riuscito, devi cambiare la password');
            this.router.navigate(['/home'], {
              queryParams: { forceChange: true, username: this.username },
            });
          } else {
            alert('Login completato con successo');
            this.router.navigate(['/home'], {
              queryParams: { forceChange: false, username: this.username },
            });
          }
        },
        error: (err) => {
          alert('Errore: ' + (err.error?.error || 'Credenziali non valide'));
        },
      });
  }
}
