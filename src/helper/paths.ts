import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { upath } from '../core';
import { pathRelativeToWorkspace, getWorkspaceFolders } from '../host';

function getFileSystemPath(input: any): string {
  // If input is already a string, use it directly
  let result: string;
  if (typeof input === 'string') {
    result = input;
  } else if (input && input.fsPath) {
    result = input.fsPath;
  } else {
    return String(input);
  }

  if (process.platform === 'win32' && result.length >= 2 && result[1] === ':') {
    result = result[0].toUpperCase() + result.substr(1);
  }
  if (process.platform === 'win32' || process.platform === 'darwin') {
    try {
      const realpath = fs.realpathSync.native(result);
      if (realpath.toLowerCase() === result.toLowerCase()) {
        result = realpath;
      }
    } catch (e) {
      // ignore if path doesn't exist yet
    }
  }
  return result;
}

export function simplifyPath(absolutePath: string) {
  return pathRelativeToWorkspace(absolutePath);
}

// FIXME: use fs.pathResolver instead of upath
export function toRemotePath(localPath: string, localContext: string, remoteContext: string) {
  return upath.join(remoteContext, path.relative(getFileSystemPath(localContext), getFileSystemPath(localPath)));
}

// FIXME: use fs.pathResolver instead of upath
export function toLocalPath(remotePath: string, remoteContext: string, localContext: string) {
  return path.join(localContext, upath.relative(remoteContext, remotePath));
}

export function isSubpathOf(possiableParentPath: string, pathname: string) {
  return path.normalize(pathname).indexOf(path.normalize(possiableParentPath)) === 0;
}

export function replaceHomePath(pathname: string) {
  return pathname.substr(0, 2) === '~/' ? path.join(os.homedir(), pathname.slice(2)) : pathname;
}

export function resolvePath(from: string, to: string) {
  return path.resolve(from, replaceHomePath(to));
}

export function isInWorkspace(filepath: string) {
  const workspaceFolders = getWorkspaceFolders();
  return (
    workspaceFolders &&
    workspaceFolders.some(
      // vscode can't keep filepath's stable, covert them to toLowerCase before check
      folder => filepath.toLowerCase().indexOf(folder.uri.fsPath.toLowerCase()) === 0
    )
  );
}
