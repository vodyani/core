import SafeStringify from 'fast-safe-stringify';

/**
 * Safe and fast serialization alternative to JSON.stringify.
 * Gracefully handles circular structures instead of throwing in most cases. It could return an error string if the circular object is too complex to analyze, e.g. in case there are proxies involved.
 * Provides a deterministic ("stable") version as well that will also gracefully handle circular structures. See the example below for further information.
 *
 * @publicApi
 */
export { SafeStringify };
