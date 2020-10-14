// ************************************************************************** //
//                                                                            //
//                                                                            //
//   ApiRequester.js                                                          //
//                                                        ________            //
//   By: bulliby <wellsguillaume+at+gmail.com>           /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2019/03/10 19:10:46 by bulliby            \     \_\ \     /     //
//   Updated: 2020/10/14 20:27:44 by bulliby             \________/\/\_/      //
//                                                                            //
// ************************************************************************** //


import axios from 'axios';

const ApiRequesterLoader = Object.create(null);

class ApiRequester {

    constructor(url){
        this.baseUrl = url,
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Accept' : 'application/vnd.github.v3+json'
            },
            auth: {
                username: '',
                password: ''
            }
        });
    }

    setUserName(name)
    {
        this.username = name;
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
        return this.axios.get(`${this.baseUrl}/repos/${this.username}/${reponame}/traffic/clones`,  {
            params: {
                per: 'week',
            }
        });
    }

    getViews(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.username}/${reponame}/traffic/views`, {
            params: {
                per: 'week',
            }
        });
    }

    getReferrers(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.username}/${reponame}/traffic/popular/referrers`);
    }
}

ApiRequesterLoader.install = function (Vue, options) {
        Vue.prototype.$apiRequester = new ApiRequester(options.url);
}

export default ApiRequesterLoader;
