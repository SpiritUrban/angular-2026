import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from './core/app-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
}
