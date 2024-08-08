import * as Sentry from '@sentry/node';
import LoggerInterface from './interface/logger.interface';

export default class SentryLogger implements LoggerInterface {
  constructor() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.APP_ENV,
      tracesSampleRate: 1.0
    });
  }

  debug(message: string): void {
    Sentry.captureMessage(message, 'debug');
  }

  error(message: string, hint?: any): void {
    Sentry.captureException(message, hint);
  }

  info(message: string): void {
    Sentry.captureMessage(message, 'info');
  }

  log(message: string): void {
    Sentry.captureMessage(message, 'log');
  }

  warn(message: string): void {
    Sentry.captureMessage(message, 'warning');
  }
}
