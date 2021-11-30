//dashboard
import {DsIcon} from '@beyond-js/dashboard/unnamed/components/core/code';
//models
import {ReactiveModel} from '@beyond-js/dashboard-lib/models/js';

//CONTEXTS
import {AppModulesContext, DSWorkspaceContext} from '@beyond-js/dashboard/unnamed/workspace/context/code';

//@TODO: @julio Remove editor context
const EditorContext = React.createContext();
const useEditorContext = () => React.useContext(EditorContext);