
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LuNewspaper, LuSparkles, LuEarth, LuBookmark, LuUsers } from 'react-icons/lu';


export default function MobileNav() {
    return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
                <div className="grid grid-cols-2 gap-2">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`
                        }
                    >
                        <LuNewspaper size={16} />
                        Feed
                    </NavLink>

                    <NavLink
                        to="/myPosts"
                        className={({ isActive }) =>
                            `flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`
                        }
                    >
                        <LuSparkles size={16} />
                        My Posts
                    </NavLink>

                    <NavLink
                        to="/community"
                        className={({ isActive }) =>
                            `flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`
                        }
                    >
                        <LuEarth size={16} />
                        Community
                    </NavLink>

                    <NavLink
                        to="/saved"
                        className={({ isActive }) =>
                            `flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`
                        }
                    >
                        <LuBookmark size={16} />
                        Saved
                    </NavLink>
                </div>
            </div>

            <div className="space-y-3 xl:hidden">
                <NavLink
                    to="/friends"
                    className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
                >
                    <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
                        <LuUsers className="text-[#1877f2]" size={17} />
                        Suggested Friends
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">5</span>
                        <span className="text-xs font-bold text-[#1877f2]">Show</span>
                    </span>
                </NavLink>
            </div>
        </>
    );
}