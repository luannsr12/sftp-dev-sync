import Client from 'ssh2-sftp-client';
import { SftpConfig } from './config';
import { Logger } from './utils/logger';
export declare class ConnectionManager {
    private client;
    private config;
    private logger;
    private connecting;
    constructor(logger: Logger);
    connect(config: SftpConfig): Promise<boolean>;
    disconnect(): Promise<void>;
    reconnect(): Promise<boolean>;
    getClient(): Client | null;
    getConfig(): SftpConfig | null;
    isConnected(): boolean;
}
//# sourceMappingURL=connection.d.ts.map