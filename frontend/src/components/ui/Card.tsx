import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

function Card({ children, className = '', onClick }: CardProps) {
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!onClick) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.currentTarget.click()
    }
  }

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`overflow-hidden rounded-2xl border border-[#ECEAE4] bg-white ${onClick ? 'cursor-pointer transition-colors hover:border-[#C7D2FE]' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
