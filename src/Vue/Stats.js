// ************************************************************************** //
//                                                                            //
//                                                                            //
//   Stats.js                                                                 //
//                                                        ________            //
//   By: waxer <wellsguillaume+at+gmail.com>             /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2022/05/15 14:27:32 by waxer              \     \_\ \     /     //
//   Updated: 2022/05/27 10:33:30 by waxer               \________/\/\_/      //
//                                                                            //
// ************************************************************************** //

import { ApiRequester } from '../api/ApiRequester.js';

const StatsLoader = Object.create(null);

class RepoStats {
    constructor(name, clones, views, referrer) {
        this.stats = {};
        this.stats.name = name;
        this.stats.clones = (clones.length > 0) ? clones[0].uniques : 0;
        this.stats.views = (views.length > 0) ? views[0].uniques : 0;
        this.stats.referrer = referrer;
    }
}


class RawStats {
    constructor(name, clones, views, referrer) {
        this.stats = {};
        this.stats.name = name;
        this.stats.clones = clones;
        this.stats.views = views;
        this.stats.referrer = referrer;
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
        choosenDate = choosenDate.toISOString().split('T')[0];
        return repoStats.data[type].filter((stats) => {
            let dateEl = stats.timestamp.split('T')[0];
            return dateEl == choosenDate;
        });
    }
}

StatsLoader.install = function (Vue, options) {
        Vue.prototype.$stats = new Stats();
}

export { StatsLoader, RawStats, RepoStats }
