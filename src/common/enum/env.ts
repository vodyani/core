/**
 * Process Variables
 */
export enum PROCESS_ENV {
  /** Apply environment variables */
  ENV = 'NODE_ENV',
  /** Application Ports */
  PORT = 'NODE_PORT',
  /** Application Name */
  NAME = 'NODE_NAME',
}
/**
 * Environment Variables
 */
export enum ENV {
  /** Default environment */
  DEFAULT = 'DEFAULT',
  /** Local environment */
  LOCAL = 'LOCAL',
  /** Development environment */
  DEV = 'DEV',
  /** Test environment */
  TEST = 'TEST',
  /** Feature Acceptance Test environment */
  FAT = 'FAT',
  /** System Integrate Test environment */
  SIT = 'SIT',
  /** Acceptance Test environment */
  UAT = 'UAT',
  /** Evaluation Test environment */
  PET = 'PET',
  /** Simulation environment */
  SIM = 'SIM',
  /** Pre environment */
  PRE = 'PRE',
  /** Production environment */
  PRO = 'PRO',
}
