export const DSTreeContext = new React.createContext();
export const useDSTreeContext = () => React.useContext(DSTreeContext);
/**
 * Tree tabs is used to add the left padding in each subtree branch.
 * @type {string}
 */
const TREE_TABS = 5;

/**
 * Main tree file
 *
 * @param title
 * @param className
 * @param controls
 * @param tree
 * @returns {JSX.Element}
 * @constructor
 */
export function DSTree({title, className, controls = {}, tree}) {
    const [opened, setOpened] = React.useState(true);
    const cls = `${opened ? '' : 'is-hidden'}${title ? '' : ' no-header'}`;
    const {texts} = useDSAsideContext();
    if (!tree) {
        console.error("are you trying to instance a DSTree component without a tree?", tree);
        return null;
    }
    const [items, setItems] = React.useState(tree.items);
    useBinder([tree], () => setItems(tree.items));
    return (
        <DSTreeContext.Provider value={{actions: {}, controls, tree, texts: texts.tree}}>
            <section tabIndex="0" className={`${cls} ds-tree__container${className ? ` ${className}` : ''}`}>
                {
                    title && <DSTreeHeader tree={tree} opened={opened} title={title} setOpened={setOpened}/>
                }
                <div className="ds-tree">
                    <BranchList className="first-tree" opened={opened} tree={tree}/>
                </div>
            </section>

        </DSTreeContext.Provider>
    );
}
