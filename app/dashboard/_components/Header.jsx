"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    useEffect(()=>{
        // console.log(path)
    
    })
  return (
    <div className='flex px-4 items-center justify-between bg-secondary shadow-sm'>
      <img src="https://assets.grok.com/users/6f79ec4b-b50b-4c97-aeb8-3d1102be3730/generated/J4LmgWE7gStmwbRh/image.jpg" alt="logo" width={100} height={100} className='h-fit w-36' />
      <ul className=' hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>How it works?</li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
