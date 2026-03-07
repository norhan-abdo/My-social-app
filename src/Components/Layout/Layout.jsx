import React from 'react'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import { Outlet } from 'react-router-dom'
import RightSidebar from '../RightSidebar/RightSidebar'
import Navbar from '../Navbar/Navbar'
import CreatePost from '../CreatePost/CreatePost'
import MobileNav from '../MobileNav/MobileNav'

export default function Layout() {
    return (
        <div>

            <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">

                <Navbar />

            </header>

            <div className='mx-auto max-w-7xl px-3 py-3.5'>
                <main className='min-w-0'>
                    <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">

                        <LeftSidebar />
                        <div className='space-y-4'>

                            <MobileNav />
                            <CreatePost />
                            <Outlet />

                        </div>
                        <RightSidebar />
                    </div>
                </main>
            </div>

        </div>
    )
}
