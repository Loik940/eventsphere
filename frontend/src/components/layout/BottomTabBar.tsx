import type { LucideIcon } from 'lucide-react'
import { Home, PlusCircle, Ticket, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

type TabItem = {
  label: string
  path: string
  icon: LucideIcon
  isActive: (pathname: string) => boolean
}

const tabs: TabItem[] = [
  {
    label: 'Explorer',
    path: '/',
    icon: Home,
    isActive: (pathname) =>
      pathname === '/' || pathname === '/events' || (pathname.startsWith('/events/') && pathname !== '/events/new'),
  },
  {
    label: 'Créer',
    path: '/events/new',
    icon: PlusCircle,
    isActive: (pathname) => pathname === '/events/new',
  },
  {
    label: 'Inscriptions',
    path: '/inscriptions',
    icon: Ticket,
    isActive: (pathname) => pathname === '/inscriptions' || pathname.startsWith('/inscriptions/'),
  },
  {
    label: 'Profil',
    path: '/profile',
    icon: User,
    isActive: (pathname) => pathname === '/profile' || pathname.startsWith('/profile/'),
  },
]

function BottomTabBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#ECEAE4] bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid h-16 grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.isActive(pathname)

          return (
            <button
              key={tab.path}
              type="button"
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-1 text-xs font-medium ${
                isActive ? 'text-[#4F46E5]' : 'text-[#94A3B8]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={22} strokeWidth={2} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomTabBar
