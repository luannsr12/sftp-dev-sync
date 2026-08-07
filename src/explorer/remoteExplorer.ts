import * as vscode from 'vscode';
import { ConnectionManager } from '../connection';
import { Logger } from '../utils/logger';

export class RemoteNode implements vscode.TreeItem {
  label: string;
  collapsibleState: vscode.TreeItemCollapsibleState;
  iconPath?: string | vscode.Uri | { light: string | vscode.Uri; dark: string | vscode.Uri };
  command?: vscode.Command;
  isDirectory: boolean;
  remotePath: string;

  constructor(
    label: string,
    remotePath: string,
    isDirectory: boolean,
    collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
  ) {
    this.label = label;
    this.remotePath = remotePath;
    this.isDirectory = isDirectory;
    this.collapsibleState = collapsibleState;

    if (isDirectory) {
      this.iconPath = new vscode.ThemeIcon('folder');
    } else {
      this.iconPath = new vscode.ThemeIcon('document');
    }
  }
}

export class RemoteExplorer implements vscode.TreeDataProvider<RemoteNode> {
  private _onDidChangeTreeData = new vscode.EventEmitter<RemoteNode | undefined | null | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private connectionManager: ConnectionManager;
  private logger: Logger;

  constructor(connectionManager: ConnectionManager, logger: Logger) {
    this.connectionManager = connectionManager;
    this.logger = logger;
  }

  getTreeItem(element: RemoteNode): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: RemoteNode): Promise<RemoteNode[]> {
    if (!this.connectionManager.isConnected()) {
      return [];
    }

    try {
      const client = this.connectionManager.getClient();
      const config = this.connectionManager.getConfig();

      if (!client || !config) {
        return [];
      }

      const remotePath = element ? element.remotePath : config.remotePath;
      const files = await client.list(remotePath);

      return files.map((file) => {
        const fullPath = `${remotePath}/${file.name}`.replace(/\/+/g, '/');
        const isDir = file.type === 'd';
        return new RemoteNode(
          file.name,
          fullPath,
          isDir,
          isDir ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
        );
      });
    } catch (error) {
      this.logger.error(`Failed to list remote files: ${error}`);
      return [];
    }
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
