import auth0 from 'auth0-js';

var auth = new auth0.WebAuth({
  domain: "https://bulliby.eu.auth0.com",
  clientID: "3c47a9a8faf9b82f5634"
});

export default function login() {
  auth.authorize({
    responseType: 'token',
    redirectUri: "http://wellsguillaume.fr"
  });
}
