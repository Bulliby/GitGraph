const CookiesLoader = Object.create(null);

class Cookies {
    constructor() {
        this.parseCookies();
    }

    getCookie(key) {
        return this.cookieParsed[key];
    }

    parseCookies() {
        /**
         * Taken from https://gist.github.com/rendro/525bbbf85e84fa9042c2#gistcomment-2972653
         * For simple purpose
         */
        this.cookieParsed = Object.fromEntries(document.cookie.split('; ').map(x => x.split('=')));
    }

    /**
     * Taken from https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript#answer-24103596
     */
    setCookie(name,value,days) {
        var expires = "";
        var date = new Date();
        if (days) {
            date.setTime(date.getTime() + (days*24*60*60*1000));
        } else {
            var date = new Date();
            date.setTime(0);
        }
        expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
}

CookiesLoader.install = function (Vue, options) {
        Vue.prototype.$cookies = new Cookies();
}

export { CookiesLoader, Cookies };
