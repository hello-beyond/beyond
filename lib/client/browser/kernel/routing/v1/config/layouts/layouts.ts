import {ILayoutConfig, LayoutConfig} from "./layout";

export class LayoutsConfig extends Map<string, LayoutConfig> {
    register(layouts: ILayoutConfig[]) {
        for (const layout of layouts) {
            this.set(layout.name, new LayoutConfig(layout));
        }
    }
}
