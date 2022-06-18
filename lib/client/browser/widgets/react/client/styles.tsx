import * as React from 'react';
import {StylesManager} from '@beyond-js/widgets/render/ts';

export default function ({styles}: { styles: StylesManager }) {
    const rs = React.useState(0);

    // Listen for .css bundle changes
    React.useEffect(() => {
        const refresh = () => rs[1](rs[0] + 1);
        styles.on('change', refresh);
        return () => (styles.off('change', refresh) && void 0);
    }, []);


    const head: React.ReactElement[] = [...styles.resources].map(url => {
        return <link key={url} href={url} rel='stylesheet' onLoad={() => styles.onloaded(url)}/>;
    });
    return <>{head}</>;
}
