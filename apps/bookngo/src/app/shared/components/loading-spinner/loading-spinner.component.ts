import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p *ngIf="showText">Loading...</p>
    </div>
  `,
  styles: [`
    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid var(--secondary-background);
      border-top: 5px solid var(--primary-text);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    p {
      margin-top: 1rem;
      color: var(--primary-text);
    }
  `],
  inputs: ['showText']
})
export class LoadingSpinnerComponent {
  showText = true;
} 