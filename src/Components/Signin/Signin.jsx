import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { FaUser, FaKey } from "react-icons/fa";
import SocialHub from '../SocialHub/SocialHub';
import axios from 'axios';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { authContext } from '../../context/AuthContext';

export default function Signin() {

    const { handleAuthSuccess } = useContext(authContext);
    // hooks
    const navigate = useNavigate();
    const location = useLocation();
    const [apiLoginError, setApiLoginError] = useState(""); // هنا هانخزن رسالة الخطأ
    // validation schema
    const loginSchema = zod.object({

        identifier: zod.string().nonempty("Email or Username is required.").min(3, "Please enter a valid email or username."),
        password: zod.string().nonempty("Password is required.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "Password must include uppercase, lowercase, number, and special character")

    })
    // RHF hook => useForm()
    const { handleSubmit, register, formState, setError } = useForm({

        defaultValues: {

            identifier: "",
            password: ""

        },

        mode: 'onSubmit',
        resolver: zodResolver(loginSchema)

    });


    function handleLogin(values) {
        // values = { identifier: "ahmed@gmail.com", password: "123456" }
        const body = {
            password: values.password,
        };

        if (values.identifier.includes("@")) {
            body.email = values.identifier;
        } else {
            body.username = values.identifier;
        }

        axios.post("https://route-posts.routemisr.com/users/signin", body, {
            headers: { "Content-Type": "application/json" }
        })
            .then(resp => {
                console.log("Login success:", resp.data);
                console.log(resp.data.data.token)
                setApiLoginError("");
                handleAuthSuccess(resp.data.data.token);
                localStorage.setItem('loginName', resp.data.data.user.name)
                localStorage.setItem('loginPhoto', resp.data.data.user.photo)

                navigate("/home");

            })
            .catch(err => {
                console.error("Login error:", err.response?.data || err);
                setApiLoginError(err.response?.data?.message || "Incorrect email or password");
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
                            Log in to Route Posts
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Log in and continue your social journey.
                        </p>

                        {/* Form */}
                        <form noValidate onSubmit={handleSubmit(handleLogin)} className="mt-5 space-y-3.5">
                            {/* Email / Username */}
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <FaUser size={18} />
                                </span>
                                <input
                                    {...register("identifier")}
                                    type="text"
                                    placeholder="Email or username"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                                />
                            </div>
                            {formState.errors.identifier && <p className='mt-1 text-xs font-semibold text-rose-600'>{formState.errors.identifier.message}</p>}

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

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-[#00298d] py-3 text-base font-extrabold text-white transition hover:bg-[#001f6b] disabled:opacity-60"
                            >
                                Log In
                            </button>

                            {/* Forgot Password */}
                            <button
                                type="button"
                                className="mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline"
                            >
                                Forgot password?
                            </button>

                            {/* error message when login failed*/}
                            {apiLoginError && (
                                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700">
                                    {apiLoginError}
                                </div>
                            )}

                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}
