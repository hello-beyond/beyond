import * as React from "react";
import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle */
const DSBoards = new (class extends Events {
    #items: Map<string, object> = new Map();
    get items() {
        return this.#items;
    }

    add(identifier: string, specs: object) {
        this.items.set(identifier, specs);
        this.trigger('board.added');
    }
})();

/**
 * Workspace
 */
export /*bundle */ const DSWorkspaceContext = React.createContext();
export /*bundle */ const useDSWorkspaceContext = () => React.useContext(DSWorkspaceContext);
/**
 * ASide
 */
export /*bundle */ const DSAsideContext = React.createContext();
export /*bundle */ const useDSAsideContext = () => React.useContext(DSAsideContext);
/**
 * Panels
 */
export /*bundle */ const WorkspacePanelsContext = React.createContext();
export /*bundle */ const useWorkspacePanelsContext = () => React.useContext(WorkspacePanelsContext);
/**
 * Application
 */
export /*bundle */ const AppContext = React.createContext();
export /*bundle */ const useAppContext = () => React.useContext(AppContext);
/**
 * MODULES
 */
export const AppModulesContext = React.createContext();
export const useAppModulesContext = () => React.useContext(AppModulesContext);
