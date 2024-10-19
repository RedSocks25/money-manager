import Link from 'next/link'
import React from 'react'

interface Props {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const SidebarOption = ({ name, href, icon }: Props) => {
  return (
    <Link 
      href={href} 
      className="flex items-center block px-4 py-2 my-2 mx-5 text-white-700 rounded hover:bg-blue-900 transition-colors duration-300"
    >
        <span className="mr-2">{icon}</span>
        {name}
    </Link>
  )
}
