// ************************************************************************** //
//                                                                            //
//                                                                            //
//   ApiRequester.js                                                          //
//                                                        ________            //
//   By: bulliby <wellsguillaume+at+gmail.com>           /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2019/03/10 19:10:46 by bulliby            \     \_\ \     /     //
//   Updated: 2020/07/14 15:07:13 by bulliby             \________/\/\_/      //
//                                                                            //
// ************************************************************************** //


import axios from 'axios';

export default class ApiRequester {

    constructor(token, baseUrl, name=null){
        this.baseUrl = baseUrl;
        this.token = token;
        this.name = name;
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Authorization' : 'token ' + this.token,
                'Accept' : 'application/vnd.github.v3+json'
            }
        });
    }

    getUser(){
        return this.axios.get(`${this.baseUrl}/user`);
    }

    getClones(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/clones`,  {
            params: {
                per: 'week',
            }
        });
    }

    getViews(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/views`, {
            params: {
                per: 'week',
            }
        });
    }

    getReferrers(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/popular/referrers`);
    }
}
