export const buildUrl = (
  url: string | undefined,
  hostname: string | undefined,
  path: string | undefined,
) => (url && hostname && path ? new URL(url, `https://${hostname}`).origin + path : undefined);
