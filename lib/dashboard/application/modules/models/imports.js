import {ReactiveModel} from '@beyond-js/dashboard-lib/models/js';
import {
    Application, Consumers, ApplicationModule, ProcessorDependencies, ProcessorCompiler
} from '@beyond-js/dashboard-lib/models/ts';

import {getEditorManager} from '@beyond-js/dashboard/ds-editor/code';
import {TreeFactory} from '@beyond-js/dashboard/workspace-tree/code';
import {FavoritesFactory} from '@beyond-js/dashboard/unnamed/workspace/components/favorites/code';
import {DSNotifications} from '@beyond-js/dashboard/unnamed/workspace/components/notifications/code';

import Indexed from '@beyond-js/plm/plm-indexed-db/code';
