import type { ReactNode } from 'react'

import BottomTabBar from './BottomTabBar'
import Navbar from './Navbar'

type PageLayoutProps = {
  children: ReactNode
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans text-[#0F172A]">
      <Navbar />
      <main className="pb-20 md:pb-0">{children}</main>
      <BottomTabBar />
    </div>
  )
}

export default PageLayout
