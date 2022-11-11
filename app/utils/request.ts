type Body = Record<string, string | number | boolean | null | undefined>;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const baseRequest =
  (method: HttpMethod) =>
  async (url: RequestInfo, body: Body, headers: HeadersInit = {}) => {
    const req = await fetch(url, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        ...headers,
      }),
      body: JSON.stringify(body),
    });
    const res = await req.json();

    return {
      ok: req.ok,
      statusText: req.statusText,
      res,
    };
  };

export const post = baseRequest('POST');
export const patch = baseRequest('PATCH');
export const put = baseRequest('PUT');
export const get = baseRequest('GET');
