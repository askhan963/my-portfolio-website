"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  className?: string
}

export default function Input({
  label,
  error,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {icon && <span className="mr-2 flex-shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>}
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200",
            error 
              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
              : "border-gray-300 dark:border-gray-600",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
