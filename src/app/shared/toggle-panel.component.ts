import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-toggle-panel',
  standalone: true,
  template: `
    <section class="toggle-panel">
      <header class="toggle-panel__header">
        <h2 class="toggle-panel__title">{{ title() }}</h2>
        <button type="button" (click)="onToggle()">
          {{ open() ? 'Close' : 'Open' }}
        </button>
      </header>

      @if (open()) {
        <div class="toggle-panel__body">
          <label>
            Value:
            <input [value]="value()" (input)="onValueInput($event)" />
          </label>
          <p class="toggle-panel__hint">Echo: {{ value() }}</p>
        </div>
      }
    </section>
  `,
  styles: [
    `:host{display:block;border:1px solid var(--panel-border,#ccc);border-radius:8px;padding:12px;margin:12px 0}`,
    `.toggle-panel__header{display:flex;align-items:center;justify-content:space-between;gap:8px}`,
    `.toggle-panel__title{margin:0;font-size:1rem}`,
    `.toggle-panel__body{margin-top:10px}`,
    `.toggle-panel__hint{opacity:.7}`,
  ]
})
export class TogglePanelComponent {
  title = input<string>('Panel');
  // Two-way bindable booleans and strings using model()
  open = model<boolean>(false);
  value = model<string>('');

  toggled = output<boolean>();

  onToggle(): void {
    this.open.set(!this.open());
    this.toggled.emit(this.open());
  }

  onValueInput(ev: Event): void {
    const val = (ev.target as HTMLInputElement).value;
    this.value.set(val);
  }
}
