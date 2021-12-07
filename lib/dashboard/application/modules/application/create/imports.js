//  APP
import {BeyondAlert} from '@beyond-js/dashboard/unnamed/components/core/code';
import {BeyondImage} from '@beyond-js/ui/image/code';
import {NotifyManager} from '@beyond-js/dashboard/unnamed/components/notify/js';
import {DS_ICONS, DsIconButton, DsIcon} from '@beyond-js/dashboard/unnamed/components/core/code';
import {useBinder} from '@beyond-js/dashboard/unnamed/components/binder/code';
//  Library Beyond-UI
import {BeyondModal} from '@beyond-js/ui/modal/code';
import {BeyondSpinner} from '@beyond-js/ui/spinner/code';
import {BeyondInput, BeyondForm, BeyondButton} from '@beyond-js/ui/form/code';

//  Library beyond-Dashboard
import {ApplicationBuilder} from '@beyond-js/dashboard-lib/models/js';
import {ReactiveModel} from '@beyond-js/dashboard-lib/models/js';

const CreateAppContext = React.createContext();
const useCreateAppContext = () => React.useContext(CreateAppContext);

