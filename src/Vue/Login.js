import auth0 from 'auth0-js';
import axios from 'axios';
import crypto from 'crypto';

var auth = new auth0.WebAuth({
    domain: "github.com/login/oauth",
    clientID: "3c47a9a8faf9b82f5634",
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
    domain: "github.com/login/oauth",
    clientID: "3c47a9a8faf9b82f5634"
});

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

var verifier = base64URLEncode(crypto.randomBytes(32));
console.log(verifier);

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

var challenge = base64URLEncode(sha256(verifier));


function requestToken(code) {
    auth0s.oauthToken({
        grantType: 'authorization_code',
        code: code,
        redirect_uri: 'http://gitgraph/github-auth',
        clientID: "3c47a9a8faf9b82f5634",
        code_verifier: verifier
    }, function(whatitis, token, encore) {
        console.log("this i don't know => ", whatitis);
        console.log("token", token);
        /*
        localStorage.setItem('token', token.accessToken);
        return axios
                .get('https://api.github.com/repos/' + localStorage.name + '/' + 'replay' + '/traffic/clones', {headers : {'Authorization' : 'Bearer ' + token}}).then((response) => { console.log(response); }).catch(() => { console.log('fuck'); });
            */
    });
}

export { login, requestToken , getCode, challenge }
