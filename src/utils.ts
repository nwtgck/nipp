export function loadScriptOnce(scriptPath: string): Promise<void> {
  if (typeof (loadScriptOnce as any).__scriptPathToLoadPromise === "undefined") {
    (loadScriptOnce as any).__scriptPathToLoadPromise = {};
  }
  const __scriptPathToLoadPromise: {[path: string]: Promise<void>} =
    (loadScriptOnce as any).__scriptPathToLoadPromise;
  // If already loaded
  if (scriptPath in (loadScriptOnce as any).__scriptPathToLoadPromise) {
    return __scriptPathToLoadPromise[scriptPath];
  }
  // Set
  __scriptPathToLoadPromise[scriptPath] = new Promise<void>((resolve, reject) => {
    // Load script dynamically
    const script = document.createElement('script');
    script.src = scriptPath;
    script.onload = () => {
      (loadScriptOnce as any).__scriptPathToLoadPromise[scriptPath] = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return __scriptPathToLoadPromise[scriptPath];
}
