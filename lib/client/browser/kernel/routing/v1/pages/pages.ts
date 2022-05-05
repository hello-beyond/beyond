import type {URI} from "../uri/uri";
import {PageInstanceData} from "./data";

type pathname = string;

export class Pages extends Map<pathname, PageInstanceData> {
    // Find a page by instance id
    find(id: string) {
        return [...this.values()].find(instance => instance.id === id);
    }

    register(uri: URI, element: string): PageInstanceData {
        const {pathname} = uri;

        let data: PageInstanceData = this.has(pathname) ? this.get(pathname) : undefined;
        data = data ? data : new PageInstanceData(element);
        data.uri = uri;
        this.set(pathname, data);

        return data;
    }
}
