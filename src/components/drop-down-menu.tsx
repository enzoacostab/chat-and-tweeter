'use client'

import React, { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import Profile from './profile'
import { AuthUser } from '@/app/lib/definitions'

export default function DropDownMenu({ user, children, className }: { user: AuthUser, children: ReactNode, className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setMenuOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick as any);
    return () => {
      document.removeEventListener("mousedown", handleClick as any);
    };
  });

  return (
    <div ref={divRef} className='relative'>
      <Profile className={className} func={setMenuOpen} image={user?.photo} name={user?.name} menuOpen={menuOpen}/>
      {menuOpen && children}
    </div>
  )
}
