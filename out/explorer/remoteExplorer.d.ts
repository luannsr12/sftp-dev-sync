import * as vscode from 'vscode';
import { ConnectionManager } from '../connection';
import { Logger } from '../utils/logger';
export declare class RemoteNode extends vscode.TreeItem {
    isDirectory: boolean;
    remotePath: string;
    constructor(label: string, remotePath: string, isDirectory: boolean, collapsibleState?: vscode.TreeItemCollapsibleState);
}
export declare class RemoteExplorer implements vscode.TreeDataProvider<RemoteNode> {
    private _onDidChangeTreeData;
    readonly onDidChangeTreeData: vscode.Event<void | RemoteNode | null | undefined>;
    private connectionManager;
    private logger;
    constructor(connectionManager: ConnectionManager, logger: Logger);
    getTreeItem(element: RemoteNode): vscode.TreeItem;
    getChildren(element?: RemoteNode): Promise<RemoteNode[]>;
    refresh(): void;
}
//# sourceMappingURL=remoteExplorer.d.ts.map