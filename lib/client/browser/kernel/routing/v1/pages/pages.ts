import type {URI} from "../uri/uri";
import type {PageConfig} from "../config/pages";
import type {LayoutConfig} from "../config/layouts";
import {PageInstanceData} from "./data";

type pathname = string;

export class Pages extends Map<pathname, PageInstanceData> {
    register(uri: URI, page: PageConfig, layouts: LayoutConfig[]): PageInstanceData {
        const {pathname} = uri;

        let data: PageInstanceData = this.has(pathname) ? this.get(pathname) : undefined;
        data = data ? data : new PageInstanceData(page, layouts);
        data.uri = uri;
        this.set(pathname, data);

        return data;
    }
}
