'use client'

import { usePathname } from "next/navigation"
import Link from 'next/link'
import { NEXT_PUBLIC_SITE_TITLE } from '../app/server-constants'
import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    // { label: 'Side Project', path: '/blog' },
  ]

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">
          {NEXT_PUBLIC_SITE_TITLE}
        </Link>
      </h1>
      <Link href="/">
        <img className="logo hidden lg:block" width={'250px'} src="logo-text.svg" alt="" />
        <img className="logo lg:hidden" width={'48px'} src="logo.svg" alt="" />
      </Link>
      
      <ul>
        {navItems.map(({ label, path }) => (
          <li className="hover:bg-gray-100 p-2 rounded-xl" key={label}>
            <Link href={path} className={pathname === path ? 'active' : null}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
