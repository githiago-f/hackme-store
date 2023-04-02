export function makeUrl(path, query, addr = 'localhost', port = 8080) {
  const url = new URL(`http://${addr}:${port}${path}`);
  Object.entries(query)
    .forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  return url;
}
