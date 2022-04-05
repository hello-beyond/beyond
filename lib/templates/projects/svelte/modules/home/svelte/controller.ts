import {SvelteWidgetController} from '@beyond-js/kernel/svelte-widget/ts';
import type {SvelteComponent} from 'svelte';

export /*bundle*/
class Controller extends SvelteWidgetController {
    get Widget(): SvelteComponent {
        return require('./widget').default;
    }
}
