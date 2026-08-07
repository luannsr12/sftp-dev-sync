import * as vscode from 'vscode';

export class Logger {
  private channel: vscode.OutputChannel;

  constructor() {
    this.channel = vscode.window.createOutputChannel('SFTP Dev Sync');
  }

  log(message: string, show = false): void {
    const timestamp = new Date().toLocaleTimeString();
    this.channel.appendLine(`[${timestamp}] ${message}`);
    if (show) {
      this.channel.show(true);
    }
  }

  error(message: string, show = true): void {
    const timestamp = new Date().toLocaleTimeString();
    this.channel.appendLine(`[${timestamp}] ERROR: ${message}`);
    if (show) {
      this.channel.show(true);
    }
  }

  success(message: string, show = false): void {
    const timestamp = new Date().toLocaleTimeString();
    this.channel.appendLine(`[${timestamp}] ✓ ${message}`);
    if (show) {
      this.channel.show(true);
    }
  }

  show(): void {
    this.channel.show(true);
  }
}
