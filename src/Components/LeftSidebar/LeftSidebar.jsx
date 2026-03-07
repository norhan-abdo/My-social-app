import React from 'react'
import {
    FaHome,
    FaUser,
    FaBookmark,
    FaUsers,
    FaCalendarAlt,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";


export default function LeftSidebar() {


    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
     ${isActive
            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`;
    return (


        <aside className='hidden h-fit space-y-3 xl:sticky xl:top-21 xl:block'>

            <div className='rounded-2xl border border-slate-200 bg-white p-3 shadow-sm'>

                <ul className="space-y-1">
                    <li>
                        <NavLink to="/" className={linkClasses}>
                            <FaHome className="text-lg" />
                            <span className="font-medium">Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/myPosts" className={linkClasses}>
                            <FaUser className="text-lg" />
                            <span className="font-medium">My Posts</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/community" className={linkClasses}>
                            <FaBookmark className="text-lg" />
                            <span className="font-medium">community</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/saved" className={linkClasses}>
                            <FaUsers className="text-lg" />
                            <span className="font-medium">Saved</span>
                        </NavLink>
                    </li>

                </ul>

            </div>
        </aside>

    );
}



