"use client"

import React, { useState, useRef } from 'react'
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface PasswordInputProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  autoComplete?: string
  className?: string
}

export default function PasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  autoComplete = "off",
  className = "",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPassword(!showPassword)
    // Keep focus on input after toggle
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        // Move cursor to end of input
        const length = inputRef.current.value.length
        inputRef.current.setSelectionRange(length, length)
      }
    }, 0)
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        <LockClosedIcon className="h-4 w-4 mr-2 flex-shrink-0" />
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        <div
          onClick={handleToggleClick}
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 select-none"
          style={{ userSelect: 'none' }}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
