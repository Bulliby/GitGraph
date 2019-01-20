import auth0 from 'auth0-js';
import axios from 'axios';
import crypto from 'crypto';

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
    }, function(whatitis, token, encore) {
        console.log("this i don't know => ", whatitis);
        console.log("token", token);
        localStorage.setItem('token', token.accessToken);
        return axios
                .get('https://api.github.com/repos/' + localStorage.name + '/' + 'replay' + '/traffic/clones', {headers : {'Authorization' : 'Bearer ' + token}}).then((response) => { console.log(response); }).catch(() => { console.log('fuck'); });
    });
}

function getCode() {
    axios
        .get('https://bulliby.eu.auth0.com/authorize?scope=public_repo&response_type=code&client_id=613wYDuqtCAY2Xe8Q6iR2sy2R51OcKD1&code_challenge=1234&code_challenge_method=S256&redirect_uri=http://gitgraph/github-auth').then((response) => { console.log(response) }).catch(() => { console.log('fuck'); });
}

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

var verifier = base64URLEncode(crypto.randomBytes(32));

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}
var challenge = base64URLEncode(sha256(verifier));

export { login, requestToken , getCode }
