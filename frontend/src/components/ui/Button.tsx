import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  isLoading?: boolean
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'type'>

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#4F46E5] text-white hover:bg-[#4338CA]',
  secondary: 'border border-[#ECEAE4] bg-white text-[#0F172A] hover:bg-[#F9F8F6]',
  ghost: 'bg-transparent text-[#64748B] hover:bg-[#F4F3F0]',
  danger: 'bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-14 px-6 text-lg',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  isLoading = false,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
