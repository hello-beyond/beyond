declare const requirejs: any;
import {beyond} from '@beyond-js/kernel/core/ts';

(function (config) {
    const path = `monaco/static/${!beyond.local ? 'min' : 'dev'}/vs`;
    config({paths: {vs: path}});
})(requirejs.config);
