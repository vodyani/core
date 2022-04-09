import { ModuleMetadata } from '@nestjs/common';

export interface DomainModuleOptions {
  imports?: ModuleMetadata['imports'];
  exports?: ModuleMetadata['exports'];
  service?: ModuleMetadata['providers'];
  manager?: ModuleMetadata['providers'];
  repository?: ModuleMetadata['providers'];
  provider?: ModuleMetadata['providers'];
  entity?: ModuleMetadata['providers'];
}

export interface ApiModuleOptions {
  imports?: ModuleMetadata['imports'];
  controller?: ModuleMetadata['controllers'];
  consumer?: ModuleMetadata['providers'];
  aop?: ModuleMetadata['providers'];
}

export interface ContainerModuleOptions {
  api: ModuleMetadata['imports'];
  domain: ModuleMetadata['imports'];
  infrastructure: ModuleMetadata['imports'];
  aop?: ModuleMetadata['providers'];
}
