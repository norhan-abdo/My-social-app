import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function NavLayout() {
    return (
        <div className="min-h-screen bg-[#f0f2f5]">

            <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">

                <Navbar />

            </header>
            <div className="mx-auto max-w-7xl px-3 py-3.5">

                <main className="min-w-0">
                    <Outlet />

                </main>
            </div>
        </div>)
}
