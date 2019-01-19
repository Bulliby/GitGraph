import auth0 from 'auth0-js';

var auth = new auth0.WebAuth({
    domain: "bulliby.eu.auth0.com",
    clientID: "613wYDuqtCAY2Xe8Q6iR2sy2R51OcKD1",
});

function login() {
    auth.authorize({
        responseType: 'code',
        scope: 'public_repo',
        connection: 'github',
        redirectUri: 'http://gitgraph/github-auth'
    });
}

var auth0s = new auth0.Authentication({
    domain: "bulliby.eu.auth0.com",
    clientID: "613wYDuqtCAY2Xe8Q6iR2sy2R51OcKD1"
});

function requestToken(code) {
    auth0s.oauthToken({
        grantType: 'authorization_code',
        code: code,
        redirect_uri: 'http://gitgraph/github-auth',
        clientID: "613wYDuqtCAY2Xe8Q6iR2sy2R51OcKD1"
    }, function(whatitis, token) {
        localStorage.setItem('token', token.accessToken);
    });
}

export { login, requestToken }
