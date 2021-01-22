import { url } from "inspector";

const protocol = window.location.protocol.replace('http', 'ws');
// const protocol = protocol2.replace('http', 'ws');
// const host = window.location.host;
const host = "list-of-liquors.herokuapp.com"
export const environment = {
  production: true,
  baseUrl: `${protocol}//${host}`,
  // herokuUrl: 'https://cors-anywhere.herokuapp.com/https://list-of-liquors.herokuapp.com'
  herokuUrl: 'https://hidden-refuge-19682.herokuapp.com/https://list-of-liquors.herokuapp.com'
};