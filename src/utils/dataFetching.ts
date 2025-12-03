const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithDelay<T>(
  url: string,
  delayMs: number = 600
): Promise<T> {
  await delay(delayMs);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const promiseCache = new Map<string, Promise<any>>();

export function getCachedData<T>(url: string, delayMs?: number): Promise<T> {
  if (!promiseCache.has(url)) {
    promiseCache.set(url, fetchWithDelay<T>(url, delayMs));
  }
  return promiseCache.get(url)!;
}

export function clearCache(url?: string) {
  if (url) {
    promiseCache.delete(url);
  } else {
    promiseCache.clear();
  }
}
