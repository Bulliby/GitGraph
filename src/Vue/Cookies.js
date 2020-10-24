const CookiesLoader = Object.create(null);

class Cookies {
    constructor() {
        this.parseCookies();
    }

    getCookie(key) {
        return this.cookieParsed[key];
    }

    parseCookies() {
        this.cookieParsed = Object.fromEntries(document.cookie.split('; ').map(x => x.split('=')));
    }

    eraseCookie(name, path,domain) {
        document.cookie = name + "=" + ((path) ? ";path="+path:"")+ ((domain)?";domain="+domain:"") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

CookiesLoader.install = function (Vue, options) {
        Vue.prototype.$cookies = new Cookies();
}

export { CookiesLoader, Cookies };
