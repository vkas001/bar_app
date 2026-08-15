const g = globalThis as any;
g.__reanimatedLoggerConfig = {
  level: 2,
  strict: true,
  logFunction: ({ level, message }: { level: number; message: string }) => {
    if (level === 2) {
      console.error(message);
    } else {
      console.warn(message);
    }
  },
};