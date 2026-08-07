import * as vscode from 'vscode';
import { ConnectionManager } from '../connection';
import { ConfigManager } from '../config';
import { Logger } from '../utils/logger';

export async function diffFile(
  connectionManager: ConnectionManager,
  configManager: ConfigManager,
  logger: Logger,
  file?: vscode.Uri
): Promise<void> {
  vscode.window.showInformationMessage('Diff feature coming soon');
  logger.log('Diff command executed');
}
