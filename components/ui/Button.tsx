import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large'
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'default',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-sage-700 text-sand-50 hover:bg-sage-800 active:bg-sage-900',
    secondary: 'bg-transparent text-ink-900 border-2 border-ink-900 hover:bg-ink-900 hover:text-sand-50',
    ghost: 'bg-transparent text-ink-700 hover:text-ink-900 hover:bg-sand-100',
  }

  const sizeClasses = {
    default: 'px-8 py-3 text-body-sm',
    large: 'px-10 py-4 text-body',
  }

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}
