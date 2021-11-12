import React from "react";
import {routing} from '@dependencies/beyond/routing/ts';

export function Empty({texts}) {
    return (
        <div className="empty-content">
            <h4>{texts.empty}</h4>

            <a onClick={() => routing.pushState('/')}>
                {texts.actions.back}
            </a>
        </div>
    )
}