export interface SftpConfig {
    name?: string;
    host: string;
    port?: number;
    protocol?: string;
    username?: string;
    password?: string;
    privateKey?: string;
    passphrase?: string;
    remotePath: string;
    localPath?: string;
    uploadOnSave?: boolean;
    includeFolders?: string[];
    includeFiles?: string[];
    ignore?: string[];
}
export declare class ConfigManager {
    private config;
    private configPath;
    loadConfig(): Promise<SftpConfig | null>;
    createConfig(): Promise<SftpConfig | null>;
    getConfig(): SftpConfig | null;
    getConfigPath(): string | null;
}
//# sourceMappingURL=config.d.ts.map