import auth0 from 'auth0-js';

var auth = new auth0.WebAuth({
    domain: "bulliby.eu.auth0.com",
    clientID: "3c47a9a8faf9b82f5634"
});

export function login() {
    auth.authorize({
        responseType: 'code',
        scope: 'public_repo',
        redirectUri: 'https://gitgraph.wellsguillaume.fr'
    });
}
