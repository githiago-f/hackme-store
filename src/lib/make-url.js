export function makeUrl(path, query) {
  const url = new URL('http://localhost:8080' + path);
  Object.entries(query)
    .forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  return url;
}
