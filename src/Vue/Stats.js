// ************************************************************************** //
//                                                                            //
//                                                                            //
//   Stats.js                                                                 //
//                                                        ________            //
//   By: waxer <wellsguillaume+at+gmail.com>             /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2022/05/15 14:27:32 by waxer              \     \_\ \     /     //
//   Updated: 2022/05/15 16:39:33 by waxer               \________/\/\_/      //
//                                                                            //
// ************************************************************************** //

import { ApiRequester } from '../api/ApiRequester.js';

const StatsLoader = Object.create(null);

class RepoStats {
    constructor() {
        this.name = "";
        this.clones = 0;
        this.views= 0;
        this.reffers= "";
    }
}

class Stats {
    constructor() {
        this.apiRequester = new ApiRequester('https://api.github.com');
        //this.getRepoStats('123');
    }

    getRepoStats(repo) {
        // this.apiRequester.getRepositories().then((repos) => {
        //     let repo = null;
        //     for (repo of repos.data) {
        //         return Promise.all([this.apiRequester.getClones(repo.name), this.apiRequester.getViews(repo.name), this.apiRequester.getReferrers(repo.name)]);
        //     }
        // });
        return Promise.all([this.apiRequester.getClones(repo.name), this.apiRequester.getViews(repo.name), this.apiRequester.getReferrers(repo.name)]);
    }
}

StatsLoader.install = function (Vue, options) {
        Vue.prototype.$stats = new Stats();
}

export default StatsLoader;
