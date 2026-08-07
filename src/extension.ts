import * as vscode from 'vscode';
import { Logger } from './utils/logger';
import { StatusBarManager } from './utils/statusBar';
import { ConfigManager } from './config';
import { ConnectionManager } from './connection';
import { registerCommands } from './commands';
import { RemoteExplorer } from './explorer/remoteExplorer';

let logger: Logger;
let statusBar: StatusBarManager;
let configManager: ConfigManager;
let connectionManager: ConnectionManager;
let remoteExplorer: RemoteExplorer;

export async function activate(context: vscode.ExtensionContext) {
  logger = new Logger();
  statusBar = new StatusBarManager();
  configManager = new ConfigManager();
  connectionManager = new ConnectionManager(logger);
  remoteExplorer = new RemoteExplorer(connectionManager, logger);

  logger.log('SFTP Dev Sync activated');

  // Register tree view
  vscode.window.registerTreeDataProvider(
    'sftp-dev-sync-explorer',
    remoteExplorer
  );

  // Register all commands
  registerCommands(context, configManager, connectionManager, logger, remoteExplorer);

  // Watch for config changes
  const configWatcher = vscode.workspace.createFileSystemWatcher(
    '**/.vscode/sftp-dev-sync.json'
  );

  configWatcher.onDidChange(async () => {
    logger.log('Config file changed');
    await connectionManager.reconnect();
  });

  configWatcher.onDidDelete(async () => {
    logger.log('Config file deleted');
    await connectionManager.disconnect();
  });

  context.subscriptions.push(configWatcher);

  statusBar.show('SFTP Dev Sync ready');
}

export function deactivate() {
  connectionManager.disconnect();
  logger.log('SFTP Dev Sync deactivated');
}
