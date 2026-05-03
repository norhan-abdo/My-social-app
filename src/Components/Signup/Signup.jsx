import React, { useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { FaUser } from "react-icons/fa";
import SocialHub from '../SocialHub/SocialHub';
import { FaKey, FaAt, FaUsers, FaCalendarAlt, } from "react-icons/fa";
import axios from 'axios';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { authContext } from '../../context/AuthContext';

export default function Signup() {

    const { handleAuthSuccess } = useContext(authContext);
    // hooks
    const navigate = useNavigate();
    const location = useLocation();
    // validation schema
    const registerSchema = zod.object({

        name: zod.string().nonempty("Name is reuired.").min(2, "Name must be at least 2 characters."),
        username: zod.preprocess(
            (val) => val === "" ? undefined : val, zod.string().regex(/^[a-z0-9_]{3,30}$/, "Username must be 3-30 chars (a-z, 0-9, _)").optional()),
        email: zod.string().nonempty("Email is required.").email("Invalid email address"),
        dateOfBirth: zod
            .string()
            .min(1, "Date of birth is required.")
            .refine(val => !isNaN(new Date(val).getTime()), {
                message: "Invalid date."
            })
            .transform(val => new Date(val)).refine(
                (date) => date <= new Date(),
                { message: "Date of birth cannot be in the future." }
            ),
        gender: zod.string()
            .min(1, "Gender is required.")
            .refine(val => ['male', 'female'].includes(val), {
                message: "Invalid gender selection"
            }),
        password: zod.string().nonempty("Password is required.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "Password must include uppercase, lowercase, number, and special character"),
        rePassword: zod.string().nonempty("Please confirm your password.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "Password must include uppercase, lowercase, number, and special character")

    }).refine(function (regObj) {

        return regObj.password === regObj.rePassword;
    }, { path: ['rePassword'], error: 'Passwords do not match.' })

    // RHF hook => useForm()
    const { handleSubmit, register, formState, setError } = useForm({

        defaultValues: {

            name: "",
            username: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            password: "",
            rePassword: ""
        },

        mode: 'onSubmit',
        resolver: zodResolver(registerSchema)

    });

    function myHandleSubmit(values) {
        console.log(values);

        axios.post('https://route-posts.routemisr.com/users/signup', values, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (resp) {
                console.log(resp.data)
                handleAuthSuccess(resp.data.data.token);
                localStorage.setItem('loginName', resp.data.data.user.name)
                localStorage.setItem('loginPhoto', resp.data.data.user.photo)

                navigate("/home");
            })
            .catch(function (error) {
                console.log(error.errors)
            });
    }
    return (


        <div className='min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex lg:items-center' style={{ fontFamily: 'Cairo, sans-serif' }}>

            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">

                <SocialHub />
                <section className="order-1 w-full max-w-107.5 lg:order-2">
                    <div className="rounded-2xl bg-white p-4 sm:p-6">
                        {/* Mobile Header */}
                        <div className="mb-4 text-center lg:hidden">
                            <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                                Route Posts
                            </h1>
                            <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                                Connect with friends and the world around you on Route Posts.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className={`rounded-lg py-2 text-sm font-extrabold transition
                                    ${location.pathname === "/login"
                                        ? "bg-white text-[#00298d] shadow-sm"
                                        : "text-slate-600 hover:text-slate-800"
                                    }`}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className={`rounded-lg py-2 text-sm font-extrabold transition
                                  ${location.pathname === "/signup"
                                        ? "bg-white text-[#00298d] shadow-sm"
                                        : "text-slate-600 hover:text-slate-800"
                                    }`}
                            >
                                Register
                            </button>

                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-extrabold text-slate-900">
                            Create a new account
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>

                        {/* Form */}
                        <form noValidate onSubmit={handleSubmit(myHandleSubmit)} className="mt-5 space-y-3.5">
                            {/* Full Name */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaUser size={18} />
                                </span>
                                <input
                                    {...register("name")}
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                />
                                {formState.errors.name && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.name.message}</p>}
                            </div>

                            {/* Username */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaAt size={18} />
                                </span>
                                <input
                                    {...register("username")}
                                    type="text"
                                    name="username"
                                    placeholder="Username (optional)"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                />
                            </div>
                            {formState.errors.username && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.username.message}</p>}

                            {/* Email */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaAt size={18} />
                                </span>
                                <input
                                    {...register("email")}
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                />
                            </div>
                            {formState.errors.email && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.email.message}</p>}

                            {/* Gender */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaUsers size={18} />
                                </span>
                                <select
                                    {...register("gender")}
                                    name="gender"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            {formState.errors.gender && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.gender.message}</p>}

                            {/* Date of Birth */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaCalendarAlt size={18} />
                                </span>
                                <input
                                    {...register("dateOfBirth")}
                                    type="date"
                                    name="dateOfBirth"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                />
                            </div>
                            {formState.errors.dateOfBirth && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.dateOfBirth.message}</p>}

                            {/* Password */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaKey size={18} />
                                </span>
                                <input
                                    {...register("password")}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                />
                            </div>
                            {formState.errors.password && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.password.message}</p>}

                            {/* Confirm Password */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaKey size={18} />
                                </span>
                                <input
                                    {...register("rePassword")}
                                    type="password"
                                    name="rePassword"
                                    placeholder="Confirm password"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                />
                            </div>
                            {formState.errors.rePassword && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.rePassword.message}</p>}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-[#00298d] py-3 text-base font-extrabold text-white transition hover:bg-[#001f6b] disabled:opacity-60"
                            >
                                Create New Account
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}





