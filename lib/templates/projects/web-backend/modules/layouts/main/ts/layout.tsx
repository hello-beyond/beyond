import * as React from "react";

const Header = ({title}) => (<header><h1>{title}</h1></header>);

export /*bundle*/
class Widget extends React.Component {
    render() {
        return (
            <div className="main-widget">
                <Header title="Web App"/>
                <div className="content">
                    <div className="aside-panel">
                        <menu-layout/>
                    </div>
                    <main>
                        <beyond-layout-children/>
                    </main>
                </div>
            </div>
        );
    }
}
