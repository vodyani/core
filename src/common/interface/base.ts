import { Provider } from '@nestjs/common';

import { BaseClass, BaseModule } from '../type';

export interface DomainModuleOptions {
  imports?: BaseModule[];
  service: Provider[];
  manager?: Provider[];
  repository?: Provider[];
  provider?: Provider[];
  entity?: Provider[];
}

export interface ApiModuleOptions {
  imports?: BaseModule[];
  controller: BaseClass[];
  consumer?: Provider[];
  aop?: Provider[];
}

export interface InfrastructureModuleOptions {
  imports?: BaseModule[];
}

export interface ContainerModuleOptions {
  imports?: BaseModule[];
  aop?: Provider[];
}
