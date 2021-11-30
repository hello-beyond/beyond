import {ReactiveModel, ModuleBundleBuilder} from '@beyond-js/dashboard-lib/models/js';
import {DsIcon, DsIconButton, BeyondAlert} from '@beyond-js/dashboard/unnamed/components/core/code';

import {BeyondModal} from '@beyond-js/ui/modal/code';
import {BeyondSpinner} from '@beyond-js/ui/spinner/code';
import {BeyondInput, BeyondForm, BeyondButton, BeyondSwitch} from '@beyond-js/ui/form/code';

const CreateModuleContext = React.createContext();
const useCreateModuleContext = () => React.useContext(CreateModuleContext);