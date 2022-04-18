// ************************************************************************** //
//                                                                            //
//                                                                            //
//   ApiRequester.js                                                          //
//                                                        ________            //
//   By: bulliby <wellsguillaume+at+gmail.com>           /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2019/03/10 19:10:46 by bulliby            \     \_\ \     /     //
//   Updated: 2022/04/16 14:21:54 by waxer               \________/\/\_/      //
//                                                                            //
// ************************************************************************** //


import axios from 'axios';
import { Cookies } from '../Vue/Cookies';

const ApiRequesterLoader = Object.create(null);

class ApiRequester {

    constructor(url){
        this.baseUrl = url;
        this.cookies = new Cookies();
        this.name = this.cookies.getCookie('name') || '';
        this.oauth = this.cookies.getCookie('oauth') || '';
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Accept' : 'application/vnd.github.v3+json'
            },
            auth: {
                username: this.name,
                password: this.oauth,
            }
        });
    }

    setName(name) {
        this.axios.defaults.auth.username = name;
        this.name = name;
    }

    setToken(oauth){
        this.axios.defaults.auth.password = oauth;
        this.oauth = oauth;
    }

    getAxios() {
        return this.axios;
    }

    getUser(){
        return this.axios.get(`${this.baseUrl}/user`);
    }

    getRepositories() {
        return this.axios.get(`${this.baseUrl}/user/repos?affiliation=owner&sort=updated`);
    }

    getClones(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/clones`,  {
            params: {
                per: 'day',
            }
        });
    }

    getViews(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/views`, {
            params: {
                per: 'day',
            }
        });
    }

    getReferrers(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/popular/referrers`);
    }
}

ApiRequesterLoader.install = function (Vue, options) {
        Vue.prototype.$apiRequester = new ApiRequester(options.url);
}

export default ApiRequesterLoader;
