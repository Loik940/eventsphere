import type { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from 'react'

type InputProps = {
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  icon?: ReactNode
  min?: string | number
}

function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  min,
}: InputProps) {
  return (
    <label className="block w-full">
      {label && <span className="mb-2 block text-sm font-medium text-[#0F172A]">{label}</span>}

      <span className="relative block">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-[#64748B]">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          className={`h-11 w-full rounded-[10px] border bg-white text-base text-[#0F172A] placeholder:text-[#64748B] focus:border-2 focus:border-[#4F46E5] focus:outline-none ${icon ? 'pl-10 pr-3' : 'px-3'} ${error ? 'border-[#DC2626]' : 'border-[#ECEAE4]'}`}
        />
      </span>

      {error && <span className="mt-1 block text-sm text-[#DC2626]">{error}</span>}
    </label>
  )
}

export default Input
