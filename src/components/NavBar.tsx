import { NavLink } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
}

const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Characters' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/stats', label: 'Stats' },
]

function NavBar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand">
        Rick and Morty Dex
      </NavLink>
      <nav aria-label="Main">
        <ul className="navbar-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive ? 'navbar-link active' : 'navbar-link'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
