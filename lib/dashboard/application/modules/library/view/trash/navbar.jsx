export class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: null,
            play: false,
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.clickAction = this.clickAction.bind(this);

    }

    clickAction(event) {
        const target = event.currentTarget;
        const action = target.dataset.action;

        if (action === "play") {
            this.setState({play: !this.state.play})
        }

        target.classList.toggle('active');
    }

    changeFilter(event) {
        this.setState({active: event.target.dataset.index});
    }

    render() {
        const {changeView, view, library, texts} = this.props;
        const {active, play} = this.state;
        return (
            <div className="header-list-apps">
                <div className="info-list">
                    <Breadcrumbs library={library.id}/>
                    <h4 className="bold">{library.name}</h4>
                </div>

                <div className="container-buttons">
                    <DashboardIconButton
                        data-action="play"
                        onClick={this.clickAction}
                        className={play ? "option-button active-button" : "option-button"}
                        name={play ? "stop" : "play"}/>
                    <BeyondIconButton onClick={this.clickAction}
                                      className="option-button" icon="setting"/>
                    <BeyondIconButton onClick={this.clickAction}
                                      className="option-button" icon="arrowDownloads"/>
                </div>
                <BeyondInput className="input-search" placeholder="filter" type="text"/>
                <div className="container-view-options">
                    <h6>{texts.actions.selectView}</h6>
                    <span onClick={() => changeView('grid')} className={view === 'grid' ? '' : 'inactive'}>
                    <BeyondIcon icon="thSolid"/></span>

                    <span onClick={() => changeView('list')} className={view === 'list' ? '' : 'inactive'}
                    ><BeyondIcon icon="barsSolid"/></span>
                </div>
                <div className="container-tags">
                    <h6>{texts.actions.filter}</h6>
                    <label className={active === texts.page ? "tag tag-active" : "tag"}
                           data-value="page"
                           data-index={texts.page}
                           onClick={this.changeFilter}>
                        {texts.page}</label>
                    <label className={active === texts.code ? "tag tag-active" : "tag"}
                           data-value="code"
                           data-index={texts.code}
                           onClick={this.changeFilter}>
                        {texts.code}</label>
                    <label className={active === texts.txt ? "tag tag-active" : "tag"}
                           data-value="txt"
                           data-index={texts.txt}
                           onClick={this.changeFilter}>
                        {texts.txt}</label>
                    <label className={active === texts.all ? "tag tag-active" : "tag"}
                           data-value="all"
                           data-index={texts.all}
                           onClick={this.changeFilter}>
                        {texts.all}</label>
                </div>
                <div className="container-show-app">
                    <h6>{texts.actions.show}</h6>
                    <BeyondIconButton className="left-button" icon="left-solid"/>
                </div>
            </div>
        );
    }
}
