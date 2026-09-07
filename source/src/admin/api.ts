/**
 * Dashboard's link to the server. Holds no credentials — the session lives in an
 * HttpOnly cookie the browser cannot read, and the Sanity token stays on the server.
 */

export interface Doc extends Record<string, unknown> {
  _id?: string;
  _type?: string;
}

async function call<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch('/api/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ action, payload }),
  });

  const body = await res.json().catch(() => ({ error: 'The server sent something unreadable.' }));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `Request failed (${res.status})`);
  return body as T;
}

export const api = {
  login:  (password: string) => call<{ ok: true }>('login', { password }),
  logout: () => call<{ ok: true }>('logout'),
  me:     () => call<{ signedIn: boolean }>('me'),

  list:   (type: string) => call<{ docs: Doc[] }>('list', { type }),
  get:    (id: string) => call<{ doc: Doc }>('get', { id }),
  save:   (doc: Doc) => call<{ doc: Doc }>('save', { doc }),
  remove: (id: string) => call<{ ok: true }>('delete', { id }),

  /** Reads the file in the browser, posts it as base64, gets back an asset reference. */
  async upload(file: File): Promise<{ assetId: string; url: string }> {
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Could not read that file.'));
      reader.readAsDataURL(file);
    });
    return call<{ assetId: string; url: string }>('upload', { data, filename: file.name });
  },
};

/** Build the Sanity image field shape from an uploaded asset. */
export const imageField = (assetId: string, alt: string, credit = '') => ({
  _type: 'documentaryImage',
  asset: { _type: 'reference', _ref: assetId },
  alt,
  credit,
});
