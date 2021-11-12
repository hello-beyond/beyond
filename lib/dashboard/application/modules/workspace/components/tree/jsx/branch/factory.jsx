/**
 * Validates each branch checking if are Subtree or only branches.
 * @param tree
 * @param opened
 * @param level
 * @returns {JSX.Element}
 * @constructor
 */

function BranchFactory({item, opened, level = 0}) {
    const {controls} = useDSTreeContext();
    const types = {
        processor: DSProcessorBranch,
        default: DSSourceBranch,
        source: DSSourceBranch,
        subtree: DSSubTree,
        static: DSStaticBranch,
        module: DSModuleBranch,
        bundle: DSBundleBranch,
        dependency: DSDependencyBranch,
        consumer: DSConsumerBranch,
        resources: DsResourcesBranch,
    };

    const is = item.type ? item.type : (item.items?.size ? 'subtree' : 'default');
    const style = {};
    if (level > 0) style.paddingLeft = 8 * (level + 1);

    let Control = types[is];
    if (!!controls[is]) Control = controls[is];
    return <Control branch={item} level={level}/>;
}
