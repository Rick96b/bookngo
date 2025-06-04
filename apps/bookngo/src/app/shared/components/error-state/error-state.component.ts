import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-state">
      <div class="icon">❌</div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      @if (retryButton) {
        <button (click)="retry.emit()">Try Again</button>
      }
    </div>
  `,
  styles: [`
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      color: var(--primary-text);
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0 0 1.5rem;
      color: var(--secondary-text);
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      background-color: var(--primary-color);
      color: white;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: var(--primary-color-dark);
    }
  `],
  outputs: ['retry']
})
export class ErrorStateComponent {
  @Input() title = 'Something went wrong';
  @Input() message = 'An error occurred while processing your request.';
  @Input() retryButton = true;
} 