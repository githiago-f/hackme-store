export function makeUrl(path, query, addr = process.env.ADDR || 'localhost', port = process.env.PORT || 8080) {
  const url = new URL(`http://${addr}:${port}${path}`);
  Object.entries(query)
    .forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  return url;
}
