import Client from 'ssh2-sftp-client';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SftpConfig } from './config';
import { Logger } from './utils/logger';

function expandPath(filePath: string): string {
  if (filePath.startsWith('~')) {
    return path.join(os.homedir(), filePath.slice(1));
  }
  return filePath;
}

export class ConnectionManager {
  private client: Client | null = null;
  private config: SftpConfig | null = null;
  private logger: Logger;
  private connecting = false;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async connect(config: SftpConfig): Promise<boolean> {
    if (this.connecting) {
      return false;
    }

    if (this.client) {
      await this.disconnect();
    }

    try {
      this.connecting = true;
      this.config = config;
      this.client = new Client();

      const connectionConfig: any = {
        host: config.host,
        port: config.port || 22,
        username: config.username || 'root'
      };

      // Use password or private key
      if (config.privateKey) {
        connectionConfig.privateKey = fs.readFileSync(
          expandPath(config.privateKey)
        );
        if (config.passphrase) {
          connectionConfig.passphrase = config.passphrase;
        }
      } else if (config.password) {
        connectionConfig.password = config.password;
      }

      await this.client.connect(connectionConfig);

      this.logger.success(`Connected to ${config.host}:${config.port || 22}`);
      return true;
    } catch (error) {
      this.logger.error(`Connection failed: ${error}`);
      this.client = null;
      return false;
    } finally {
      this.connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.end();
        this.logger.log('Disconnected from server');
      } catch (error) {
        this.logger.error(`Disconnect error: ${error}`);
      } finally {
        this.client = null;
      }
    }
  }

  async reconnect(): Promise<boolean> {
    if (!this.config) {
      return false;
    }
    return this.connect(this.config);
  }

  getClient(): Client | null {
    return this.client;
  }

  getConfig(): SftpConfig | null {
    return this.config;
  }

  isConnected(): boolean {
    return this.client !== null;
  }
}
