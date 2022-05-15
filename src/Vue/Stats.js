// ************************************************************************** //
//                                                                            //
//                                                                            //
//   Stats.js                                                                 //
//                                                        ________            //
//   By: waxer <wellsguillaume+at+gmail.com>             /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2022/05/15 14:27:32 by waxer              \     \_\ \     /     //
//   Updated: 2022/05/15 23:07:38 by waxer               \________/\/\_/      //
//                                                                            //
// ************************************************************************** //

import { ApiRequester } from '../api/ApiRequester.js';

const StatsLoader = Object.create(null);

class RepoStats {
    constructor(name, clones, views, referrer) {
        this.stats = {};
        this.stats.name = name;
        this.stats.clones = (clones.length > 0) ? clones.unique : 0;
        this.stats.views = (views.length > 0) ? views.unique : 0;
        this.stats.referrer = referrer;
    }

    getStats() {
        return this.stats;
    }
}

class Stats {
    constructor() {
        this.apiRequester = new ApiRequester('https://api.github.com');
    }

    getRepoStats(repo) {
        return Promise.all([this.apiRequester.getClones(repo), this.apiRequester.getViews(repo), this.apiRequester.getReferrers(repo)]);
    }

    dateFilter(repoStats, type, choosenDate) {
        return repoStats.data[type].filter((stats) => {
            let dateEl = stats.timestamp.split('T')[0];
            return stats.length > 0 && dateEl == choosenDate;
        });
    }
}

StatsLoader.install = function (Vue, options) {
        Vue.prototype.$stats = new Stats();
}

export { StatsLoader, RepoStats }
