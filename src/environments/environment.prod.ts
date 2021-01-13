const protocol = window.location.protocol.replace('http', 'ws');
const host = window.location.host;

export const environment = {
  production: true,
  baseUrl: `${protocol}//${host}`
};
