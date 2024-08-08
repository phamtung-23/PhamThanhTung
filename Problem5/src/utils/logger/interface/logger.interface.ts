
export default interface LoggerInterface {
  info(message: string): void;
  error(message: string, hint?: any): void;
  warn(message: string): void;
  debug(message: string): void;
  log(message: string): void;
}
