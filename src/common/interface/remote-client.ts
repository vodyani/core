/**
 * Remote Configuration Client (Configuration Center).
 */
export interface RemoteConfigClient {
  /**
   * Initialize remote configuration client.
   */
  init: (...args: any[]) => Promise<any>;
  /**
   * Full synchronization of configuration client data.
   */
  sync?: (path: string, ...args: any[]) => Promise<void>;
  /**
   * Subscribe to configuration pushes from remote clients.
   */
  subscribe?: (callback: (details: Record<string, any>) => any) => Promise<void>;
  /**
   * Close the remote client.
   */
  close?: (...args: any[]) => Promise<any>;
}
