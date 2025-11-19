import { Injectable, computed, signal } from '@angular/core';

type Theme = 'light' | 'dark';

type NoticeType = 'info' | 'success' | 'error' | 'warning';

interface Notice {
  id: number;
  type: NoticeType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  
  private _busyCount = signal(0);
  readonly loading = computed(() => this._busyCount() > 0);

  readonly theme = signal<Theme>('light');
  readonly isDark = computed(() => this.theme() === 'dark');

  readonly preferences = signal<Record<string, unknown>>({});

  private _notices = signal<Notice[]>([]);
  readonly notices = computed(() => this._notices());

  private _noticeSeq = 1;

  startLoading(): void {
    this._busyCount.update(v => v + 1);
  }

  stopLoading(): void {
    this._busyCount.update(v => (v > 0 ? v - 1 : 0));
  }

  setLoading(value: boolean): void {
    if (value) {
      this._busyCount.set(1);
    } else {
      this._busyCount.set(0);
    }
  }

  toggleTheme(): void {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  setPreference(key: string, value: unknown): void {
    this.preferences.update(p => ({ ...p, [key]: value }));
  }

  getPreference<T = unknown>(key: string): T | undefined {
    const p = this.preferences();
    return p[key] as T | undefined;
  }

  notify(message: string, type: NoticeType = 'info'): number {
    const id = this._noticeSeq++;
    const n: Notice = { id, type, message };
    this._notices.update(list => [n, ...list]);
    return id;
  }

  dismiss(id: number): void {
    this._notices.update(list => list.filter(n => n.id !== id));
  }

  clearNotices(): void {
    this._notices.set([]);
  }
}
