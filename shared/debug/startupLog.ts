let start = Date.now();

export function log(tag: string, ...args: any[]) {
  const ms = Date.now() - start;
 // console.log(`[STARTUP +${ms}ms] ${tag}`, ...args);
}

export function logError(tag: string, ...args: any[]) {
  const ms = Date.now() - start;
  console.error(`[STARTUP +${ms}ms][ERROR] ${tag}`, ...args);
}

export function installGlobalErrorHandlers() {
  log("installing global error handlers");
  try {
    const ErrorUtils = (globalThis as any).ErrorUtils;
    if (ErrorUtils && ErrorUtils.getGlobalHandler) {
      const prev = ErrorUtils.getGlobalHandler();
      ErrorUtils.setGlobalHandler((error: any, isFatal: boolean) => {
        logError(
          "JS GLOBAL ERROR",
          isFatal ? "(fatal)" : "(non-fatal)",
          error?.name,
          error?.message,
          error?.stack,
        );
        if (prev) prev(error, isFatal);
      });
      log("global JS error handler installed");
    } else {
      log("ErrorUtils not available (no global handler)");
    }
  } catch (e: any) {
    logError("failed to install global error handler", e?.message);
  }
}