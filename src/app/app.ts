import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from './core/app-state.service';
import { TogglePanelComponent } from './shared/toggle-panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TogglePanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly title = signal('angular-2026');
  links = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];

  showExtra = signal(false);

  toggleExtra = () => {
    this.showExtra.update(v => !v);
  };

  readonly appState = inject(AppStateService);

  toggleTheme = () => this.appState.toggleTheme();
  startLoading = () => this.appState.startLoading();
  stopLoading = () => this.appState.stopLoading();
  notifyInfo = () => this.appState.notify('Hello from AppStateService');

  // State for TogglePanelComponent (two-way via explicit input/output bindings with signals)
  panelOpen = signal(false);
  panelValue = signal('Hello');
  onPanelToggled = (open: boolean) => {
    this.appState.notify(open ? 'Panel opened' : 'Panel closed');
  };
}
