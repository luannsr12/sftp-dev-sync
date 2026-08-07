import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
import Client from 'ssh2-sftp-client';
import { ConnectionManager } from '../connection';
import { ConfigManager } from '../config';
import { Logger } from '../utils/logger';
import { Filter } from '../filter';

export async function downloadProject(
  connectionManager: ConnectionManager,
  configManager: ConfigManager,
  logger: Logger
): Promise<void> {
  const client = connectionManager.getClient();
  const config = await configManager.loadConfig();

  if (!client || !config) {
    vscode.window.showErrorMessage('Not connected to server');
    return;
  }

  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showErrorMessage('No workspace folder open');
    return;
  }

  const localBase = config.localPath
    ? path.resolve(workspace.uri.fsPath, config.localPath)
    : workspace.uri.fsPath;

  const remotePath = config.remotePath;
  const filter = new Filter(config.includeFolders || [], config.includeFiles || []);

  let downloadedCount = 0;
  let skippedCount = 0;

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'SFTP Dev Sync: Downloading project...',
      cancellable: true
    },
    async (progress, token) => {
      try {
        await downloadDirectory(
          client,
          remotePath,
          localBase,
          '',
          filter,
          logger,
          progress,
          token,
          (downloaded, skipped) => {
            downloadedCount = downloaded;
            skippedCount = skipped;
          }
        );

        logger.success(
          `Download complete: ${downloadedCount} files downloaded, ${skippedCount} skipped`,
          true
        );
        vscode.window.showInformationMessage(
          `Download complete: ${downloadedCount} files downloaded, ${skippedCount} skipped`
        );
      } catch (error) {
        if (token.isCancellationRequested) {
          logger.log('Download cancelled by user');
          vscode.window.showWarningMessage('Download cancelled');
        } else {
          logger.error(`Download failed: ${error}`, true);
          vscode.window.showErrorMessage(`Download failed: ${error}`);
        }
      }
    }
  );
}

async function downloadDirectory(
  client: Client,
  remotePath: string,
  localBase: string,
  relativePath: string,
  filter: Filter,
  logger: Logger,
  progress: vscode.Progress<{ message?: string; increment?: number }>,
  token: vscode.CancellationToken,
  onStats: (downloaded: number, skipped: number) => void
): Promise<void> {
  if (token.isCancellationRequested) {
    return;
  }

  let downloaded = 0;
  let skipped = 0;

  const fullRemotePath = remotePath + (relativePath ? '/' + relativePath : '');
  const files = await client.list(fullRemotePath);

  for (const file of files) {
    if (token.isCancellationRequested) {
      break;
    }

    // Skip hidden files and common ignored dirs
    if (file.name.startsWith('.') && file.name !== '.htaccess') {
      continue;
    }

    const fileRelPath = relativePath ? `${relativePath}/${file.name}` : file.name;
    const isDir = file.type === 'd';

    // Apply filter
    if (!filter.shouldInclude(fileRelPath, isDir)) {
      skipped++;
      logger.log(`Skipped: ${fileRelPath}`);
      continue;
    }

    if (isDir) {
      // Recurse into directory
      await downloadDirectory(
        client,
        remotePath,
        localBase,
        fileRelPath,
        filter,
        logger,
        progress,
        token,
        (d, s) => {
          downloaded += d;
          skipped += s;
        }
      );
    } else {
      // Download file
      const localFilePath = path.join(localBase, fileRelPath);
      const remoteFilePath = `${fullRemotePath}/${file.name}`;

      try {
        await fs.ensureDir(path.dirname(localFilePath));
        await client.fastGet(remoteFilePath, localFilePath);

        downloaded++;
        progress.report({ message: `${fileRelPath}` });
        logger.log(`Downloaded: ${fileRelPath}`);
      } catch (error) {
        logger.error(`Failed to download ${fileRelPath}: ${error}`);
      }
    }
  }

  onStats(downloaded, skipped);
}
