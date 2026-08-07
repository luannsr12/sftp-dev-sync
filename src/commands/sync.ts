import * as vscode from 'vscode';
import { ConnectionManager } from '../connection';
import { ConfigManager } from '../config';
import { Logger } from '../utils/logger';

export async function syncLocalToRemote(
  connectionManager: ConnectionManager,
  configManager: ConfigManager,
  logger: Logger
): Promise<void> {
  vscode.window.showInformationMessage('Sync Local → Remote feature coming soon');
  logger.log('Sync local to remote command executed');
}

export async function syncRemoteToLocal(
  connectionManager: ConnectionManager,
  configManager: ConfigManager,
  logger: Logger
): Promise<void> {
  vscode.window.showInformationMessage('Sync Remote → Local feature coming soon');
  logger.log('Sync remote to local command executed');
}
