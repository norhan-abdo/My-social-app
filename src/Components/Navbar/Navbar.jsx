import React, { useContext, useState } from "react";
import { FaHome, FaUser, FaBell, FaBars, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, NavLink } from "react-router-dom";
import { authContext } from '../../context/AuthContext';
import navImage from '../../assets/imgi_1_route.png';
export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { clearUserToken } = useContext(authContext);

    function handleLogout() {
        clearUserToken();
        navigate("/login");
    }

    return (

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <img
                    alt="Route Posts"
                    className="h-9 w-9 rounded-xl object-cover"
                    src={navImage}
                />
                <p className="hidden text-xl font-extrabold text-slate-900 sm:block">
                    Route Posts
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">

                {/* Feed */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 
                        ${isActive
                            ? "bg-white text-[#1f6fe5]"
                            : "text-slate-600 hover:bg-white/90 hover:text-slate-900"}`
                    }
                >
                    <FaHome className="text-lg" />
                    <span className="hidden sm:inline">Home</span>
                    <span className="sr-only sm:hidden">Home</span>
                </NavLink>

                {/* Profile */}
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 
                        ${isActive
                            ? "bg-white text-[#1f6fe5]"
                            : "text-slate-600 hover:bg-white/90 hover:text-slate-900"}`
                    }
                >
                    <FaUser className="text-lg" />
                    <span className="hidden sm:inline">Profile</span>
                    <span className="sr-only sm:hidden">Profile</span>
                </NavLink>

                {/* Notifications */}
                <NavLink
                    to="/notifications"
                    className={({ isActive }) =>
                        `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 
                        ${isActive
                            ? "bg-white text-[#1f6fe5]"
                            : "text-slate-600 hover:bg-white/90 hover:text-slate-900"}`
                    }
                >
                    <FaBell className="text-lg" />
                    <span className="hidden sm:inline">Notifications</span>
                    <span className="sr-only sm:hidden">Notifications</span>
                </NavLink>

            </nav>

            {/* User Menu */}
            <div className="relative">

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100 cursor-pointer"
                >
                    <img

                        alt={localStorage.getItem('loginName')}
                        className="h-8 w-8 rounded-full object-cover"
                        src={
                            localStorage.getItem('loginPhoto')
                                ? localStorage.getItem('loginPhoto')
                                : "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                        }
                        onError={(e) => {
                            e.currentTarget.src = "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png";
                        }}

                    />
                    <span className="hidden max-w-35 truncate text-sm font-semibold text-slate-800 md:block">
                        {localStorage.getItem('loginName')}                    </span>
                    <FaBars className="text-slate-500 text-sm" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                        <button
                            onClick={() => navigate("/profile")}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                            <FaUser />
                            Profile
                        </button>

                        <button
                            onClick={() => navigate("/settings")}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                            <FaCog />
                            Settings
                        </button>

                        <div className="my-1 border-t border-slate-200"></div>

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                )}

            </div>

        </div>
    );
}