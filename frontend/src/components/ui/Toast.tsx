import { useEffect, useState } from 'react'
import { CheckCircle2, X, XCircle } from 'lucide-react'

export type ToastType = 'success' | 'error'

type ToastProps = {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Attendre la fin de l'animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`relative flex w-full min-w-[320px] max-w-sm items-center gap-3 rounded-xl p-4 shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      } ${
        type === 'success'
          ? 'border border-[#A7F3D0] bg-[#ECFDF5] text-[#065F46]'
          : 'border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]'
      }`}
      role="alert"
    >
      {type === 'success' ? (
        <CheckCircle2 size={20} className="shrink-0" />
      ) : (
        <XCircle size={20} className="shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-auto rounded-lg p-1 opacity-60 hover:bg-black/5 hover:opacity-100"
        aria-label="Fermer"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default Toast
