import { boundMethod } from 'autobind-decorator';

/**
 * A class or method decorator that binds methods to the instance so that they are always accurate, even if they are detached.
 *
 * This is especially beneficial in cases like as callback, when you frequently pass methods as event handlers and would otherwise have to bind `this`.
 *
 * @publicApi
 */
export const FixedContext = boundMethod;
