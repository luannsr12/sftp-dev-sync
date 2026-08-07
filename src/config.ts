import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';

export interface SftpConfig {
  name?: string;
  host: string;
  port?: number;
  protocol?: string;
  username?: string;
  password?: string;
  privateKey?: string;
  passphrase?: string;
  remotePath: string;
  localPath?: string;
  uploadOnSave?: boolean;
  includeFolders?: string[];
  includeFiles?: string[];
  ignore?: string[];
}

export class ConfigManager {
  private config: SftpConfig | null = null;
  private configPath: string | null = null;

  async loadConfig(): Promise<SftpConfig | null> {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
      return null;
    }

    this.configPath = path.join(workspace.uri.fsPath, '.vscode', 'sftp-dev-sync.json');

    try {
      if (await fs.pathExists(this.configPath)) {
        const content = await fs.readFile(this.configPath, 'utf-8');
        this.config = JSON.parse(content);
        return this.config;
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to load config: ${error}`);
    }

    return null;
  }

  async createConfig(): Promise<SftpConfig | null> {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
      vscode.window.showErrorMessage('No workspace folder open');
      return null;
    }

    const vscodePath = path.join(workspace.uri.fsPath, '.vscode');
    await fs.ensureDir(vscodePath);

    const configPath = path.join(vscodePath, 'sftp-dev-sync.json');

    if (await fs.pathExists(configPath)) {
      const open = await vscode.window.showInformationMessage(
        'Config file already exists. Open it?',
        'Yes',
        'Cancel'
      );

      if (open === 'Yes') {
        const doc = await vscode.workspace.openTextDocument(configPath);
        await vscode.window.showTextDocument(doc);
      }
      return null;
    }

    const templateConfig: SftpConfig = {
      name: 'My Server',
      host: 'example.com',
      port: 22,
      protocol: 'sftp',
      username: 'username',
      password: 'password',
      remotePath: '/home/user/',
      uploadOnSave: false,
      includeFolders: ['src', 'public'],
      includeFiles: ['*.php', '*.js', '*.css', '*.html', '*.json']
    };

    await fs.writeFile(configPath, JSON.stringify(templateConfig, null, 2));

    const doc = await vscode.workspace.openTextDocument(configPath);
    await vscode.window.showTextDocument(doc);

    return templateConfig;
  }

  getConfig(): SftpConfig | null {
    return this.config;
  }

  getConfigPath(): string | null {
    return this.configPath;
  }
}
