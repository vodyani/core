import { PROCESS_ENV, ENV } from '../enum';

/**
 * Name of the back-end service.
 *
 * Usually the environment variable of the process `NODE_NAME`.
 */
export const name = process.env[PROCESS_ENV.NAME] || 'SERVER';
/**
 * Port of the back-end service.
 *
 * Usually the environment variable of the process `NODE_PORT`.
 */
export const port = Number(process.env[PROCESS_ENV.PORT] || '3000');
/**
 * Environment of the back-end service.
 *
 * Typically refers to the process's operating environment -`NODE_ENV`.
 */
export const env = (process.env[PROCESS_ENV.ENV] || ENV.LOCAL) as ENV;
