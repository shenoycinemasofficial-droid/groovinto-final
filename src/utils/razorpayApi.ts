export async function readRazorpayApiResponse<T extends object>(response: Response): Promise<T> {
  const body = await response.text();
  let payload: T & { error?: string };

  try {
    payload = JSON.parse(body) as T;
  } catch {
    throw new Error(`Payment server returned an invalid response (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(payload.error || `Payment request failed (HTTP ${response.status}).`);
  }

  return payload;
}