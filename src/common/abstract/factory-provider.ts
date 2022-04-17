import { Provider } from '@nestjs/common';

export abstract class ProviderFactory {
  public static token: symbol;

  public create: (...args: any[]) => Provider;
}
