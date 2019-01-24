import axios from 'axios';

function requestToken(code)
{

    axios.post('https://github.com/login/oauth/access_token', { client_id : '3c47a9a8faf9b82f5634',  
}
