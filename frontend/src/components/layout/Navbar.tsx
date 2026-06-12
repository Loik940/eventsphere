import { Bell, CalendarDays, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../store/auth.store'

const navLinks = [
  { label: 'Explorer', path: '/', matches: ['/', '/events'] },
  { label: 'Dashboard', path: '/dashboard', matches: ['/dashboard'] },
  { label: 'Mes inscriptions', path: '/inscriptions', matches: ['/inscriptions'] },
]

const isRouteActive = (pathname: string, matches: string[]): boolean =>
  matches.some((path) => {
    if (path === '/') {
      return pathname === '/'
    }

    return pathname === path || pathname.startsWith(`${path}/`)
  })

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="EventSphere accueil">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
        <CalendarDays size={18} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="font-serif text-[30px] leading-none text-[#0F172A]">EventSphere</span>
    </Link>
  )
}

function Avatar({ isAuthenticated, initials, onLogout }: { isAuthenticated: boolean; initials: string; onLogout: () => void }) {
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="rounded-[10px] px-3 py-2 text-sm font-medium text-[#64748B] hover:bg-[#F4F3F0] sm:px-4"
        >
          Connexion
        </Link>
        <Link
          to="/register"
          className="rounded-[10px] bg-[#4F46E5] px-3 py-2 text-sm font-semibold text-white hover:bg-[#4338CA] sm:px-4"
        >
          S'inscrire
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/profile"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ECEAE4] bg-[#4F46E5] text-sm font-semibold text-white"
        aria-label="Voir le profil"
      >
        {initials}
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] hover:bg-[#F4F3F0]"
        aria-label="Se déconnecter"
      >
        <LogOut size={18} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}

function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase() ?? '')
        .join('')
    : 'U'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[#ECEAE4] bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <div className="flex flex-1 items-center">
          <Logo />
        </div>

        <nav className="hidden items-center justify-center gap-1 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const isActive = isRouteActive(pathname, link.matches)

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-[#F4F3F0] font-semibold text-[#0F172A]'
                    : 'text-[#64748B] hover:bg-[#F4F3F0]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          {isAuthenticated && (
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#0F172A] hover:bg-[#F4F3F0] md:hidden"
              aria-label="Voir les notifications"
            >
              <Bell size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
          <Avatar isAuthenticated={isAuthenticated} initials={initials} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
