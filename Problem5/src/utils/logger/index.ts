// import LoggerInterface from '@/utils/logger/interface/logger.interface';
// import ConsoleLogger from '@/utils/logger/console.logger';
// import SentryLogger from '@/utils/logger/sentry.logger';
import * as process from 'process';
import LoggerInterface from './interface/logger.interface';
import ConsoleLogger from './console.logger';
import SentryLogger from './sentry.logger';

export default class Logger {
  private static instance: LoggerInterface;


  public static getInstance(): LoggerInterface {
    const isDebug: boolean = process.env.NODE_ENV === 'development';
    if (!Logger.instance) {
      Logger.instance = isDebug ? new ConsoleLogger() : new SentryLogger();
    }

    return Logger.instance;
  }

  public static setInstance(instance: LoggerInterface): void {
    Logger.instance = instance;
  }

  public static debug(message: string): void {
    Logger.getInstance().debug(message);
  }

  public static error(message: string, hint?: any): void {
    Logger.getInstance().error(message, hint);
  }

  public static info(message: string): void {
    Logger.getInstance().info(message);
  }

  public static log(message: string): void {
    Logger.getInstance().log(message);
  }

  public static warn(message: string): void {
    Logger.getInstance().warn(message);
  }
}
