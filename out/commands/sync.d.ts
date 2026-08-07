import { ConnectionManager } from '../connection';
import { ConfigManager } from '../config';
import { Logger } from '../utils/logger';
export declare function syncLocalToRemote(connectionManager: ConnectionManager, configManager: ConfigManager, logger: Logger): Promise<void>;
export declare function syncRemoteToLocal(connectionManager: ConnectionManager, configManager: ConfigManager, logger: Logger): Promise<void>;
//# sourceMappingURL=sync.d.ts.map