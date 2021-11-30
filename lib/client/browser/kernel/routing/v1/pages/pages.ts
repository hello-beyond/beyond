import type {URI} from "../uri/uri";
import type {PageConfig} from "../config/pages";
import {PageInstanceData} from "./data";

type pathname = string;

export class Pages extends Map<pathname, PageInstanceData> {
    register(uri: URI, page: PageConfig): PageInstanceData {
        const {pathname} = uri;

        let data: PageInstanceData = this.has(pathname) ? this.get(pathname) : undefined;
        data = data ? data : new PageInstanceData(page);
        data.uri = uri;
        this.set(pathname, data);

        return data;
    }
}
