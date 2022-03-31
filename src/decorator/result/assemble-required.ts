import { MetadataContainer } from '../../common';

export function Assemble(target: any, property: string) {
  const className = target.constructor.name;
  MetadataContainer.registry(className, property);
}
