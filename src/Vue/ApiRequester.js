// ************************************************************************** //
//                                                                            //
//                                                                            //
//   ApiRequester.js                                                          //
//                                                        ________            //
//   By: bulliby <wellsguillaume+at+gmail.com>           /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2019/03/10 19:10:46 by bulliby            \     \_\ \     /     //
//   Updated: 2019/03/10 19:16:32 by bulliby             \________/\/\_/      //
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
            headers: {'Authorization' : 'token ' + this.token}
        });
    }

    getUser(){
        return this.axios.get(`${this.baseUrl}/user`);
    }

    getClones(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/clones`);
    }

    getViews(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/views`);
    }

    getReferrers(reponame) {
        return this.axios.get(`${this.baseUrl}/repos/${this.name}/${reponame}/traffic/popular/referrers`);
    }
}
