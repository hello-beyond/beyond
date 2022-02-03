function View() {

    const ICONS = {
        dashboard: {
            title: 'Dashboard Icons',
            icons: DS_ICONS
        },
        beyondui: {
            title: 'Beyond Icons',
            icons: BEYOND_ICONS
        }
    }
    const [selected, setSelected] = React.useState(ICONS.dashboard);
    const iconsList = Object.keys(selected.icons).sort((a, b) => a.localeCompare(b));
    const changeIcons = event => {
        event.preventDefault();
        const target = event.currentTarget;
        setSelected(ICONS[target.dataset.icons]);
        target.closest('aside').querySelectorAll('div').forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }
    return (
        <div className="page__icons-container">

            <div className="page__content">
                <aside>
                    <nav>
                        <div data-icons="dashboard" onClick={changeIcons}>Dashboard</div>
                        <div data-icons="beyondui" onClick={changeIcons}>Beyond</div>
                    </nav>

                </aside>
                <main>
                    <header>
                        <h1>{selected.title}</h1>
                    </header>
                    <IconsList icons={iconsList}/>
                </main>

            </div>
        </div>
    );

}

