import Navbar from '@/components/Navbar'
import { Hero } from '@/feature/LandingPage'
import React from 'react'
import { Outlet } from 'react-router'

const NavLayout = () => {
  return (
    <div
    className=" min-h-screen bg-background  text-foreground antialiased max-w-full overflow-x-hidden -z-99"
  >
    <Navbar />
    <Outlet/>
  </div>
  )
}

export default NavLayout