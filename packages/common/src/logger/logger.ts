type Logger = ReturnType<typeof createLogger>;

let instance: ReturnType<typeof createLogger> | null = null;

export const logger: Logger = (() => {
  if (!instance) {
    console.log("Creating logger instance.");
    instance = createLogger();
  }
  return instance;
})();

function createLogger() {
  return {
    log: function (message: string) {
      console.log(message);
    },
    warning: function (message: string) {
      console.warn(message);
    },
    error: function (message: string) {
      console.error(message);
    },
  };
}
