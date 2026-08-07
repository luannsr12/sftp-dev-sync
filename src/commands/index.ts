import * as vscode from 'vscode';
import { ConfigManager } from '../config';
import { ConnectionManager } from '../connection';
import { Logger } from '../utils/logger';
import { RemoteExplorer } from '../explorer/remoteExplorer';
import * as downloadCommand from './download';
import * as uploadCommand from './upload';
import * as syncCommand from './sync';
import * as diffCommand from './diff';

export function registerCommands(
  context: vscode.ExtensionContext,
  configManager: ConfigManager,
  connectionManager: ConnectionManager,
  logger: Logger,
  remoteExplorer: RemoteExplorer
): void {
  // Config command
  context.subscriptions.push(
    vscode.commands.registerCommand('sftp-dev-sync.config', async () => {
      await configManager.createConfig();
    })
  );

  // Download commands
  context.subscriptions.push(
    vscode.commands.registerCommand('sftp-dev-sync.download.project', async () => {
      const config = await configManager.loadConfig();
      if (!config) {
        vscode.window.showErrorMessage('No SFTP config found');
        return;
      }

      const connected = await connectionManager.connect(config);
      if (!connected) {
        vscode.window.showErrorMessage('Failed to connect to server');
        return;
      }

      await downloadCommand.downloadProject(connectionManager, configManager, logger);
    })
  );

  // Upload commands
  context.subscriptions.push(
    vscode.commands.registerCommand('sftp-dev-sync.upload.file', async (file?: vscode.Uri) => {
      const config = await configManager.loadConfig();
      if (!config) {
        vscode.window.showErrorMessage('No SFTP config found');
        return;
      }

      const connected = await connectionManager.connect(config);
      if (!connected) {
        vscode.window.showErrorMessage('Failed to connect to server');
        return;
      }

      await uploadCommand.uploadFile(connectionManager, configManager, logger, file);
    })
  );

  // Sync commands
  context.subscriptions.push(
    vscode.commands.registerCommand('sftp-dev-sync.sync.localToRemote', async () => {
      const config = await configManager.loadConfig();
      if (!config) {
        vscode.window.showErrorMessage('No SFTP config found');
        return;
      }

      const connected = await connectionManager.connect(config);
      if (!connected) {
        vscode.window.showErrorMessage('Failed to connect to server');
        return;
      }

      await syncCommand.syncLocalToRemote(connectionManager, configManager, logger);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sftp-dev-sync.sync.remoteToLocal', async () => {
      const config = await configManager.loadConfig();
      if (!config) {
        vscode.window.showErrorMessage('No SFTP config found');
        return;
      }

      const connected = await connectionManager.connect(config);
      if (!connected) {
        vscode.window.showErrorMessage('Failed to connect to server');
        return;
      }

      await syncCommand.syncRemoteToLocal(connectionManager, configManager, logger);
    })
  );

  // Diff command
  context.subscriptions.push(
    vscode.commands.registerCommand('sftp-dev-sync.diff', async (file?: vscode.Uri) => {
      const config = await configManager.loadConfig();
      if (!config) {
        vscode.window.showErrorMessage('No SFTP config found');
        return;
      }

      const connected = await connectionManager.connect(config);
      if (!connected) {
        vscode.window.showErrorMessage('Failed to connect to server');
        return;
      }

      await diffCommand.diffFile(connectionManager, configManager, logger, file);
    })
  );
}
