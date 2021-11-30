/**
 * Uri parser
 *
 * @param href {string} The href to be parsed
 * @constructor
 */
import {Route} from "./route";
import {QueryString} from "./querystring";

export class URI {
    readonly #route: Route;
    get route() {
        return this.#route;
    }

    readonly #uri: string;
    get uri(): string {
        return this.#uri;
    }

    readonly #pathname: string;
    get pathname(): string {
        return this.#pathname;
    }

    readonly #search: string;
    get search(): string {
        return this.#search;
    }

    readonly #qs: QueryString;
    get qs() {
        return this.#qs;
    }

    readonly #hashtag;
    get hashtag() {
        return this.#hashtag;
    }

    constructor(uri: string) {
        this.#uri = uri;

        const [u, hashtag] = uri.split('#');
        const [pathname, search] = u.split('?');

        this.#pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
        this.#search = search ? search : '';
        this.#qs = new QueryString(this.#search);
        this.#hashtag = hashtag;
        this.#route = new Route(this);
    }

    initialise = async () => await this.#route.initialise();
}
