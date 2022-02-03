import {DS_ICONS, DSIcon} from '@beyond-js/dashboard/core-components/code';
import {BEYOND_ICONS} from '@beyond-js/ui/icon/code';

function A(b) {

    b.items.forEach((item) => {
        item.ejecutar(() => console.log(item.name));
    });

}
