// Hide the splash screen when the first page is shown
function hide() {
    'use strict';

    beyond.unbind('page-shown', hide);
    beyond.phonegap.ready.then(() => navigator.splashscreen ? navigator.splashscreen.hide() : null);
}

beyond.bind('page-shown', hide);
