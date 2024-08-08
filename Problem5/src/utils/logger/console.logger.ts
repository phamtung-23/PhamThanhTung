// import LoggerInterface from '@/utils/logger/interface/logger.interface';

import LoggerInterface from "./interface/logger.interface";

export default class ConsoleLogger implements LoggerInterface {
  debug(message: string): void {
    console.debug(message);
  }

  error(message: string, hint?: any): void {
    console.error(message);
    console.error(hint);
  }

  info(message: string): void {
    console.info(message);
  }

  log(message: string): void {
    console.log(message);
  }

  warn(message: string): void {
    console.warn(message);
  }
}
