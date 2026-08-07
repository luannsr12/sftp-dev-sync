import * as vscode from 'vscode';

export class StatusBarManager {
  private item: vscode.StatusBarItem;

  constructor() {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    this.item.command = 'sftp-dev-sync.config';
  }

  show(text: string): void {
    this.item.text = `$(cloud) ${text}`;
    this.item.show();
  }

  hide(): void {
    this.item.hide();
  }

  setStatus(connected: boolean): void {
    if (connected) {
      this.show('SFTP Connected');
    } else {
      this.show('SFTP Disconnected');
    }
  }

  dispose(): void {
    this.item.dispose();
  }
}
