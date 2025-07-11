import "../css/navbar.css";

const mouseEnter = (e) => {
    const menu = e.currentTarget.querySelector("ul");
    if (menu) {
        menu.style.display = "block";
    }
};
const mouseLeave = (e) => {
    const menu = e.currentTarget.querySelector("ul");
    if (menu) {
        menu.style.display = "none";
    }
};

const Navbar = () => {
  return (
    // JSX for the Navbar
    <header>
      <div className="topbar" role="banner" aria-label="Main top navigation">
        <div className="logo" aria-label="A&M TAX logo">
          <div>A&amp;M</div>
          <div className="tax">TAX</div>
        </div>
        <div style={{ marginLeft: "20px" }}>Tax</div>
      </div>
      {/* Secondary Navigation Bars... */}
      <nav
          className="secondarybar"
          aria-label="Secondary navigation menu"
          role="navigation"
        >
          <div className="nav-left">
            <div className="logo-mini" aria-label="A&M TAX mini logo">
              <div>A&amp;M</div>
              <div className="tax">TAX</div>
            </div>
            <span>A&amp;M Connect</span>
          </div>
          <nav aria-label="Secondary navigation tabs">
            <div className="dropdown" tabIndex={0} aria-haspopup="true">
              <span>Overview</span>
            </div>
            <div className="dropdown" tabIndex={0} aria-haspopup="true" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
              <span>
                Entity List <span aria-hidden="true">▼</span>
              </span>
              <ul role="menu" aria-label="Entity List submenu">
                <li role="menuitem" tabIndex={-1}>
                  All Entities
                </li>
                <li role="menuitem" tabIndex={-1}>
                  Active Entities
                </li>
                <li role="menuitem" tabIndex={-1}>
                  Inactive Entities
                </li>
              </ul>
            </div>
            <div className="dropdown" tabIndex={0} aria-haspopup="true" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}> 
              <span>
                Reports <span aria-hidden="true">▼</span>
              </span>
              <ul role="menu" aria-label="Reports submenu">
                <li role="menuitem" tabIndex={-1}>
                  Financial Reports
                </li>
                <li role="menuitem" tabIndex={-1}>
                  Compliance Reports
                </li>
              </ul>
            </div>
            <div className="dropdown" tabIndex={0} aria-haspopup="true" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
              <span>
                Structures <span aria-hidden="true">▼</span>
              </span>
              <ul role="menu" aria-label="Structures submenu">
                <li role="menuitem" tabIndex={-1}>
                  Structure 1
                </li>
                <li role="menuitem" tabIndex={-1}>
                  Structure 2
                </li>
              </ul>
            </div>
          </nav>
        </nav>
    </header>
  );
};

export default Navbar;
