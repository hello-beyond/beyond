import {IPageConfig, PageConfig} from "./page";

export interface IPageFound {
    element?: string,
    vars?: Map<string, string>
}

export class PagesConfig extends Map<string, PageConfig> {
    #splits: Map<string, string[]> = new Map();

    /**
     * Search for a route (with its vars)
     *
     * @param {string} pathname
     * @return {{element: *, vars: Map<string, string>} | {}}
     */
    find(pathname: string): IPageFound {
        const spathname = pathname.split('/');

        const splits = [...this.#splits].filter(([, split]) => split.length === spathname.length);

        let vars: Map<string, string> = new Map();
        const found = splits.find(([, split]) => {
            vars.clear();
            for (let i = 0; i < spathname.length; i++) {
                const dir = split[i];

                // Check if it is a route var (ex: /article/${id})
                if (dir.startsWith('${') && dir.endsWith('}')) {
                    const vname = dir.slice(2, dir.length - 1);
                    vars.set(vname, spathname[i]);
                    continue;
                }

                if (dir !== spathname[i]) return false;
            }
            return true;
        });

        return found ? {element: found[0], vars} : {};
    }

    register(pages: IPageConfig[]) {
        for (const page of pages) {
            const config = new PageConfig(page);
            this.set(page.name, config);
            this.#splits.set(page.name, page.route.split('/'));
        }
    }
}
