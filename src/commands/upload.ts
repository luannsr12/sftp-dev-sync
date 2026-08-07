import * as vscode from 'vscode';
import { ConnectionManager } from '../connection';
import { ConfigManager } from '../config';
import { Logger } from '../utils/logger';

export async function uploadFile(
  connectionManager: ConnectionManager,
  configManager: ConfigManager,
  logger: Logger,
  file?: vscode.Uri
): Promise<void> {
  vscode.window.showInformationMessage('Upload file feature coming soon');
  logger.log('Upload file command executed');
}
