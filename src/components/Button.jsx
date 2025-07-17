import React from 'react'

function Button({
  children,
  // type = 'button',
  // bgColor = 'bg-blue-600',
  // textColor = 'text-white',
  // className = '',
  // ...props
}) {
  return (
    <button className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-white hover:text-indigo-600 transition-all duration-200 focus:ring-2 focus:ring-indigo-400">
      {children}
    </button>
  )
}

export default Button