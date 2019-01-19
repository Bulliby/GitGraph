import auth0 from 'auth0-js';

var auth = new auth0.WebAuth({
    domain: "bulliby.eu.auth0.com",
    clientID: "613wYDuqtCAY2Xe8Q6iR2sy2R51OcKD1",
});

export default function login() {
    auth.authorize({
        responseType: 'code',
        scope: 'public_repo',
        connection: 'github'
    });
}
