'use client'
import type { Metadata } from 'next'
import './globals.css'
import Header from './Components/Header'
import Aside from './Components/Aside'
import MediaPlayer from './Components/MediaPlayer'
import MobileNav from './UI/MobileNav'
import { useUiStore } from './Store/UiStore'

const metadata: Metadata = {
  title: 'C360 Music App',
  description: "Coding Ossy's 360 challenge music website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  const toggleMobNav = useUiStore(state => state.toggleMobNav)
  return (
    <html lang="en">
      <body>
        <Header />
        <Aside />
        <MediaPlayer />
        {toggleMobNav && <MobileNav />}    
        {children}
      </body>
    </html>
  )
}
