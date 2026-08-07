import * as path from 'path';

const VENDOR_FOLDER = '.vscode';

export const EXTENSION_NAME = 'sftp-dev-sync';
export const SETTING_KEY_REMOTE = 'remotefs.remote';

export const REMOTE_SCHEME = 'remote';

export const CONGIF_FILENAME = 'sftp-dev-sync.json';
export const CONFIG_PATH = path.join(VENDOR_FOLDER, CONGIF_FILENAME);

// command not in package.json
export const COMMAND_TOGGLE_OUTPUT = 'sftp-dev-sync.toggleOutput';

// commands in package.json
export const COMMAND_CONFIG = 'sftp-dev-sync.config';
export const COMMAND_SET_PROFILE = 'sftp-dev-sync.setProfile';
export const COMMAND_CANCEL_ALL_TRANSFER = 'sftp-dev-sync.cancelAllTransfer';
export const COMMAND_OPEN_CONNECTION_IN_TERMINAL = 'sftp-dev-sync.openConnectInTerminal';

export const COMMAND_FORCE_UPLOAD = 'sftp-dev-sync.forceUpload';
export const COMMAND_UPLOAD = 'sftp-dev-sync.upload';
export const COMMAND_UPLOAD_FILE = 'sftp-dev-sync.upload.file';
export const COMMAND_UPLOAD_CHANGEDFILES = 'sftp-dev-sync.upload.changedFiles';
export const COMMAND_UPLOAD_ACTIVEFILE = 'sftp-dev-sync.upload.activeFile';
export const COMMAND_UPLOAD_FOLDER = 'sftp-dev-sync.upload.folder';
export const COMMAND_UPLOAD_ACTIVEFOLDER = 'sftp-dev-sync.upload.activeFolder';
export const COMMAND_UPLOAD_PROJECT = 'sftp-dev-sync.upload.project';

export const COMMAND_FORCE_UPLOAD_TO_ALL_PROFILES = 'sftp-dev-sync.forceUpload.to.allProfiles';
export const COMMAND_UPLOAD_TO_ALL_PROFILES = 'sftp-dev-sync.upload.to.allProfiles';
export const COMMAND_UPLOAD_FILE_TO_ALL_PROFILES = 'sftp-dev-sync.upload.file.to.allProfiles';
export const COMMAND_UPLOAD_ACTIVEFILE_TO_ALL_PROFILES = 'sftp-dev-sync.upload.activeFile.to.allProfiles';
export const COMMAND_UPLOAD_FOLDER_TO_ALL_PROFILES = 'sftp-dev-sync.upload.folder.to.allProfiles';
export const COMMAND_UPLOAD_ACTIVEFOLDER_TO_ALL_PROFILES = 'sftp-dev-sync.upload.activeFolder.to.allProfiles';
export const COMMAND_UPLOAD_PROJECT_TO_ALL_PROFILES = 'sftp-dev-sync.upload.project.to.allProfiles';

export const COMMAND_FORCE_DOWNLOAD = 'sftp-dev-sync.forceDownload';
export const COMMAND_DOWNLOAD = 'sftp-dev-sync.download';
export const COMMAND_DOWNLOAD_FILE = 'sftp-dev-sync.download.file';
export const COMMAND_DOWNLOAD_ACTIVEFILE = 'sftp-dev-sync.download.activeFile';
export const COMMAND_DOWNLOAD_FOLDER = 'sftp-dev-sync.download.folder';
export const COMMAND_DOWNLOAD_ACTIVEFOLDER = 'sftp-dev-sync.download.activeFolder';
export const COMMAND_DOWNLOAD_PROJECT = 'sftp-dev-sync.download.project';

export const COMMAND_SYNC_LOCAL_TO_REMOTE = 'sftp-dev-sync.sync.localToRemote';
export const COMMAND_SYNC_REMOTE_TO_LOCAL = 'sftp-dev-sync.sync.remoteToLocal';
export const COMMAND_SYNC_BOTH_DIRECTIONS = 'sftp-dev-sync.sync.bothDirections';

export const COMMAND_DIFF = 'sftp-dev-sync.diff';
export const COMMAND_DIFF_ACTIVEFILE = 'sftp-dev-sync.diff.activeFile';
export const COMMAND_LIST = 'sftp-dev-sync.list';
export const COMMAND_LIST_ACTIVEFOLDER = 'sftp-dev-sync.listActiveFolder';
export const COMMAND_LIST_ALL = 'sftp-dev-sync.listAll';
export const COMMAND_DELETE_REMOTE = 'sftp-dev-sync.delete.remote';
export const COMMAND_REVEAL_IN_EXPLORER = 'sftp-dev-sync.revealInExplorer';
export const COMMAND_REVEAL_IN_REMOTE_EXPLORER = 'sftp-dev-sync.revealInRemoteExplorer';

export const COMMAND_REMOTEEXPLORER_REFRESH = 'sftp-dev-sync.remoteExplorer.refresh';
export const COMMAND_REMOTEEXPLORER_REFRESH_ACTIVE_FILE = "sftp.remoteExplorer.refreshActiveFile"
export const COMMAND_REMOTEEXPLORER_EDITINLOCAL = 'sftp-dev-sync.remoteExplorer.editInLocal';
export const COMMAND_REMOTEEXPLORER_VIEW_CONTENT = 'sftp-dev-sync.viewContent';

export const COMMAND_CREATE_FOLDER = 'sftp-dev-sync.create.folder';
export const COMMAND_CREATE_FILE = 'sftp-dev-sync.create.file';
