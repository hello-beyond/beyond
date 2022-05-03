function View() {
  const [ state, setState ] = React.useState(false);
  const handleClick = e => {
    e.stopPropagation();
    setState(!state)
  }
  const sidebarItems = sidebarOptions.map((item) =>{
    return (  <SidebarItem key={item.id} href={item.href} icon={item.icon} text={item.name}/> )
  })
  const sidebarItemsSettings = sidebarOptionsSettings.map((item) =>{
    return (  <SidebarItem key={item.id} href={item.href} icon={item.icon} text={item.name}/> )
  })

    return (
    <>
      <header className="page-header">
        <nav onClick={() => setState(!state)}>
          <BeyondImage  className="logo" src="/images/logo.png" alt="logo" />
          <button  onClick={handleClick} className="toggle-mob-menu">
              <BeyondIcon   icon="arrowDropDown" />
          </button>
         
          
          <ul className={state ? "admin-menu menu-visibility" : "admin-menu"}>
            <li className="menu-heading">
              <h3>Admin</h3>
            </li>
              {sidebarItems}
            <li className="menu-heading">
              <h3>Settings</h3>
            </li>
              {sidebarItemsSettings}
            <li>
           
            </li>
          </ul>
        </nav>
      </header>
      <section className="page-content">
        <section className="search-and-user">
          <form>
            <input type="search" placeholder="Search ..." readOnly />
            <BeyondButton type="submit" aria-label="submit form">
              <BeyondIcon icon="searchSolid" />
            </BeyondButton>
          </form>
          <div className="admin-profile">
            <span className="greeting">Hello admin</span>
            <div className="notifications">
              <span className="badge">1</span>
              <BeyondIcon icon="user" />
            </div>
          </div>
        </section>
        <section className="grid">
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
        </section>
        <footer className="page-footer">
          <span>Hecho con ❤ por </span>
       
            <BeyondImage
              src="/images/logo.png"
              alt="logo"
            />
         
        </footer>
      </section>
    </>
  );
}
